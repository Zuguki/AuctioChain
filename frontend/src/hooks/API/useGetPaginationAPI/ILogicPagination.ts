interface ILogicPagination {
    CurrentPage: number;
    TotalCount: number;
    TotalPages: number;
    HasPrevious: boolean;
    HasNext: boolean;
}

export default ILogicPagination;
