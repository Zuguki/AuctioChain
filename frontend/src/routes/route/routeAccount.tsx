import { FC, lazy, LazyExoticComponent } from "react";
import { Route } from "react-router-dom";
import PathApp from "../pathApp/PathApp.ts";
import RequireAuth from "../RequireAuth.tsx";
import LazyDownload from "../LazyDownload.tsx";

const PageAccount: LazyExoticComponent<FC> = lazy(
    () => import("../../pages/account/PageAccount.tsx"),
);

const PageCreateAuction: LazyExoticComponent<FC> = lazy(
    () => import("../../pages/createAuction/PageCreateAuction.tsx"),
);

const PageCreateLot: LazyExoticComponent<FC> = lazy(
    () => import("../../pages/createLot/PageCreateLot.tsx"),
);

const MoneyManipulation: LazyExoticComponent<FC> = lazy(
    () => import("@/pages/moneyManipulation/MoneyManipulation.tsx"),
);

const PageEditLot: LazyExoticComponent<FC> = lazy(
    () => import("../../pages/editLot/PageEditLot.tsx"),
);

const PageEditAuction: LazyExoticComponent<FC> = lazy(
    () => import("../../pages/editAuction/PageEditAuction.tsx"),
);

const routeAccount = (
    <>
        <Route
            path={`${PathApp.account}${PathApp.id}`}
            element={
                <LazyDownload>
                    <PageAccount />
                </LazyDownload>
            }
        />
        <Route
            path={PathApp.createAuction}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <PageCreateAuction />
                    </LazyDownload>
                </RequireAuth>
            }
        />
        <Route
            path={`${PathApp.createLot}${PathApp.id}`}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <PageCreateLot />
                    </LazyDownload>
                </RequireAuth>
            }
        />
        <Route
            path={`${PathApp.editLot}${PathApp.id}`}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <PageEditLot />
                    </LazyDownload>
                </RequireAuth>
            }
        />
        <Route
            path={`${PathApp.editAuction}${PathApp.id}`}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <PageEditAuction />
                    </LazyDownload>
                </RequireAuth>
            }
        />
        <Route
            path={PathApp.bill}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <MoneyManipulation />
                    </LazyDownload>
                </RequireAuth>
            }
        />
    </>
);

export default routeAccount;
