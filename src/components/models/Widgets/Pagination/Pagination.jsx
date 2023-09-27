import React from "react";
import Button from "../Button/Button";
import cssStyles from "./Pagination.module.scss";

const Pagination = ({
    onPrev,
    onNext,
    onPrevTitle,
    onNextTitle,
    setCurrentPage,
    startIndex,
    endIndex,
    currentPage,
}) => {
    return (
        <div className={cssStyles.pageNumbersButton}>
            <Button onClick={onPrev} title={onPrevTitle} width={20} height={30} />
            {Array.from({ length: endIndex - startIndex + 1 }).map(
                (_, index) => (
                    <Button
                        key={startIndex + index}
                        title={(startIndex + index).toString()}
                        onClick={() => setCurrentPage(startIndex + index)}
                        primary={currentPage === startIndex + index}
                        width={20}
                        height={30}
                        color={currentPage === startIndex + index ? "white" : "black"}
                    />
                )
            )}
            <Button onClick={onNext} title={onNextTitle} width={20} height={30}/>
        </div>
    );
};

export default Pagination;
