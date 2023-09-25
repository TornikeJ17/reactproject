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
            <Button onClick={onPrev} title={onPrevTitle} />
            {Array.from({ length: endIndex - startIndex + 1 }).map(
                (_, index) => (
                    <Button
                        key={startIndex + index}
                        title={(startIndex + index).toString()}
                        onClick={() => setCurrentPage(startIndex + index)}
                        primary={currentPage === startIndex + index}
                        iconOnly
                    />
                )
            )}
            <Button onClick={onNext} title={onNextTitle} />
        </div>
    );
};

export default Pagination;
