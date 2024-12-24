import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";
import { SESSIONS } from "./useSessions.js";

const useDeleteSession = (sessionId) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries([SESSIONS]);
      // queryClient.setQueryData([SESSIONS], (oldData) => {
      //   if (!oldData) return [];
      //   return oldData.filter((session) => session._id !== sessionId);
      // });
    },
    // onError: (error) => {
    //   if (error.response?.status === 401) {
    //     queryClient.setQueryData([SESSIONS], (oldData) => {
    //       if (!oldData) return [];
    //       return oldData.filter((session) => session._id !== sessionId);
    //     });
    //   }
    // },
  });
  return { deleteSession: mutate, ...rest };
};

export default useDeleteSession;
