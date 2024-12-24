import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";
import useDeleteSession from "../hooks/useDeleteSession";
import PropTypes from "prop-types";

const SessionCard = ({ session }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { deleteSession, isPending } = useDeleteSession(_id);

  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="card bg-base-100 border border-base-200 hover:shadow-md transition-all duration-200">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-base-content/70" />
              <span className="font-medium text-sm">{formattedDate}</span>
              {isCurrent && (
                <div className="badge badge-primary badge-sm">
                  Current Session
                </div>
              )}
            </div>

            <div className="mt-2 text-xs text-base-content/70 truncate">
              {userAgent}
            </div>
          </div>

          {!isCurrent && (
            <button
              onClick={deleteSession}
              disabled={isPending}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              title="Delete Session"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <XMarkIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

SessionCard.propTypes = {
  session: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userAgent: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool,
  }).isRequired,
};

export default SessionCard;
