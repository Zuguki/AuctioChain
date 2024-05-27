import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

const usePostAPI = <Req, Res = NonNullable<unknown>>(
    request: (bodyRequest: Req) => Promise<AxiosResponse<Res>>,
) => {
    const [error, setError] = useState<AxiosError | null>(null);
    const blurError = () => setError((): null => null);

    const {
        mutateAsync: postData,
        isSuccess,
        isPending,
    } = useMutation({
        onError: (errorPost) => setError((): AxiosError => errorPost),
        mutationFn: (bodyRequest: Req): Promise<AxiosResponse<Res>> =>
            request(bodyRequest),
    });

    return { postData, error, blurError, isPending, isSuccess };
};

export default usePostAPI;
