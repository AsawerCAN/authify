import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";

const UserMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  return (
    <div className="fixed bottom-6 left-6 dropdown dropdown-top">
      <label
        tabIndex={0}
        className="btn btn-circle btn-ghost hover:bg-base-200"
      >
        <div className="relative">
          <UserCircleIcon className="h-8 w-8" />
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-base-100"></div>
        </div>
      </label>
      <div
        tabIndex={0}
        className="dropdown-content w-64 overflow-hidden rounded-lg bg-base-100 shadow-xl"
      >
        <div className="bg-base-200 p-4">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="w-10 rounded-full bg-neutral text-neutral-content">
                <span className="text-xl">JD</span>
              </div>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm opacity-70">john@example.com</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 hover:bg-base-200"
          >
            <UserCircleIcon className="h-5 w-5 opacity-70" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 hover:bg-base-200"
          >
            <Cog6ToothIcon className="h-5 w-5 opacity-70" />
            <span>Settings</span>
          </button>

          <div className="divider my-1"></div>

          <button
            onClick={signOut}
            disabled={isPending}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-error hover:bg-base-200"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span>{isPending ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
