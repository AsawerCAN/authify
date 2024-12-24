import {
  ExclamationTriangleIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { email, verified, createdAt } = user;

  return (
    <div className="container mx-auto mt-16 max-w-2xl p-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>

      {!verified && (
        <div className="alert alert-warning gap-2 mb-6">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span>Please verify your email</span>
          <button className="btn btn-sm">Resend verification</button>
        </div>
      )}

      <div className="card bg-base-200 ">
        <div className="card-body">
          <div className="avatar placeholder mb-4 self-center">
            <div className="bg-neutral text-neutral-content rounded-full w-24">
              <span className="text-3xl">{email[0].toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 opacity-70" />
              <div>
                <p className="text-sm opacity-70">Email address</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-5 w-5 opacity-70" />
              <div>
                <p className="text-sm opacity-70">Member since</p>
                <p className="font-medium">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`badge ${
                  verified ? "badge-success" : "badge-warning"
                } gap-1`}
              >
                {verified ? "Verified" : "Unverified"}
              </div>
              {/* <div className="badge badge-neutral">Free Plan</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
