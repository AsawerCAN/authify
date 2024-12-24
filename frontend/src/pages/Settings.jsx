import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import useSessions from "../hooks/useSessions";
import SessionCard from "../components/SessionCard";

const Settings = () => {
  const { sessions, isPending, isSuccess, isError } = useSessions();

  return (
    <div className="container mx-auto max-w-3xl px-4 mt-16 z-50 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Active Sessions</h1>
        <div className="badge badge-primary">
          {sessions?.length || 0} Active
        </div>
      </div>

      {isPending && (
        <div className="flex justify-center p-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {isError && (
        <div className="alert alert-error">
          <ExclamationCircleIcon className="h-6 w-6" />
          <span>Failed to load sessions. Please try again.</span>
        </div>
      )}

      {isSuccess && (
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center p-8 bg-base-200 rounded-lg">
              <p className="text-lg opacity-70">No active sessions found</p>
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session._id} session={session} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
