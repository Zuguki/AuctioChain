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

    /* const [error, setError] = useState<AxiosError | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
 */
    /*   const blurError = useCallback((): void => setError((): null => null), []);

       const postData = useCallback(
           async <T>(
               request: () => Promise<AxiosResponse<T>>,
           ): Promise<AxiosResponse<T> | undefined> => {
               setLoading((): boolean => true);
               try {
                   return await request();
               } catch (err: unknown) {
                   if (err instanceof AxiosError) {
                       setError(() => err as AxiosError);
                   }
               } finally {
                   setLoading((): boolean => false);
               }
           },
           [],
       );

       return { error, loading, blurError, postData };*/
};

export default usePostAPI;
