import { FC, lazy, LazyExoticComponent } from "react";
import { Route } from "react-router-dom";
import PathApp from "../pathApp/PathApp.ts";
import LazyDownload from "../LazyDownload.tsx";

const FormAuthorization: LazyExoticComponent<FC> = lazy(
    () =>
        import(
            "../../pages/authorization/FormAuthorization/FormAuthorization.tsx"
        ),
);

const FormRegistration: LazyExoticComponent<FC> = lazy(
    () =>
        import(
            "../../pages/authorization/FormRegistration/FormRegistration.tsx"
        ),
);
const routeAuthorization = (
    <>
        <Route
            path={PathApp.authorization}
            element={
                <LazyDownload>
                    <FormAuthorization />
                </LazyDownload>
            }
        />
        <Route
            path={PathApp.registration}
            element={
                <LazyDownload>
                    <FormRegistration />
                </LazyDownload>
            }
        />
    </>
);

export default routeAuthorization;
