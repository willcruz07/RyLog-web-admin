/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaAngleDoubleLeft, FaPencilAlt } from 'react-icons/fa';
import { TSort } from '../../models/types';
import { addZeroLeft, getDateFirebase } from '../../utils/LIB';
import { Message } from '../Message';

import './styles.scss';

interface IGridProps {
    listItems: any[];
    onEdit(item: any): void;
    textListEmpty?: string;
}

interface IPagination {
    setPage: (page: number) => void;
    page: number;
    listItems: any[];
    range: number[];
}

interface IUseTable {
    data: any[],
    page: number;
    rowsPerPage: number;
}

interface IButtonPaginateProps {
    content: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

const lineHeight = window.innerWidth > 700 ? 56 : 48;

export const GridTable: React.FC<IGridProps> = ({ listItems, onEdit, textListEmpty }) => {
    const myRefTable = React.useRef<HTMLDivElement>(null);

    const [messageIsVisible, setMessageIsVisible] = useState(false);
    const [message, setMessage] = useState('false');

    const [list, setList] = useState<any[]>([]);
    const [fullList, setFullList] = useState<any[]>([]);
    const [typeSort, setTypeSort] = useState<TSort>('ASCENDING');

    const [page, setPage] = useState(1);

    useEffect(() => {
        setList(listItems.sort((a, b) => (getDateFirebase(a.createdAt) > getDateFirebase(b.createdAt) ? -1 : getDateFirebase(a.createdAt) < getDateFirebase(b.createdAt) ? 1 : 0)));
        setFullList(listItems.sort((a, b) => (getDateFirebase(a.createdAt) > getDateFirebase(b.createdAt) ? -1 : getDateFirebase(a.createdAt) < getDateFirebase(b.createdAt) ? 1 : 0)));
    }, [listItems]);

    const getRowsPerPage = useMemo(() => {
        const table = myRefTable.current?.clientHeight || window.innerHeight - 370;

        if (table) {
            const totalOfLine = table / lineHeight;

            return Math.round(totalOfLine) - 2;
        }

        return 10;
    }, [myRefTable.current?.clientHeight]);

    const { slice, range } = useTable({ data: list, page, rowsPerPage: getRowsPerPage });

    const sortList = () => {
        slice.sort((a, b) => {
            switch (typeSort) {
                case 'ASCENDING':
                    return (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

                case 'DESCENDING':
                    return (a.name > b.name ? -1 : a.name < b.name ? 1 : 0);
            }
        });

        setTypeSort((state) => {
            switch (state) {
                case 'DESCENDING':
                    return 'ASCENDING';

                case 'ASCENDING':
                    return 'DESCENDING';
            }
        });
    };

    return (
        <>
            <div className="container-table">
                <div className="grid-table">
                    <div ref={myRefTable} className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={() => sortList()} style={{ display: 'flex', flex: 1, cursor: 'pointer', userSelect: 'none' }}>
                                        Exame
                                    </th>
                                    <th onClick={() => sortList()} style={{ display: 'flex', flex: 1, cursor: 'pointer', userSelect: 'none' }}>
                                        Status
                                    </th>
                                    <th onClick={() => sortList()} style={{ display: 'flex', flex: 2, cursor: 'pointer', userSelect: 'none' }}>
                                        Paciente
                                    </th>
                                    <th onClick={() => sortList()} style={{ display: 'flex', flex: 2, cursor: 'pointer', userSelect: 'none' }}>
                                        Solicitante
                                    </th>
                                    <th className="container-action">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slice.map((items, index) => (
                                    <tr
                                        key={index.toString()}
                                    >
                                        <td
                                            style={{
                                                display: 'flex',
                                                flex: 1,
                                            }}
                                        >
                                            {`${items.exam.type}`}
                                        </td>
                                        <td
                                            style={{
                                                display: 'flex',
                                                flex: 1,
                                            }}
                                        >
                                            {`${items.status.toUpperCase()}`}
                                        </td>
                                        <td
                                            style={{
                                                display: 'flex',
                                                flex: 2,
                                            }}
                                        >
                                            {`${items.patient.name}`}
                                        </td>
                                        <td
                                            style={{
                                                display: 'flex',
                                                flex: 2,
                                            }}
                                        >
                                            {`${items.company.name}`}
                                        </td>
                                        <td className="container-action">

                                            <button
                                                type="button"
                                                onClick={() => onEdit(items)}
                                            >
                                                <FaPencilAlt className="edit" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {listItems.length === 0 && textListEmpty && (
                                    <tr className="empty">
                                        <td>{textListEmpty}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="container-grid-footer">
                        <Pagination
                            listItems={listItems}
                            setPage={setPage}
                            page={page}
                            range={range}
                        />
                    </div>
                </div>
            </div>

            <Message
                type="DANGER"
                isVisible={messageIsVisible}
                onClose={setMessageIsVisible}
                message={message}
                title="Atenção!"
            />

        </>
    );
};

const calculateRange = ({ data, rowsPerPage }: IUseTable) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = ({ data, page, rowsPerPage }: IUseTable) => data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

export const useTable = ({ data, page, rowsPerPage }: IUseTable) => {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<any[]>([]);

    useEffect(() => {
        const range = calculateRange({ data, page, rowsPerPage });
        setTableRange([...range]);

        const slice = sliceData({ data, page, rowsPerPage });
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);

    return { slice, range: tableRange };
};

const ButtonPaginate = ({ content, onClick, active, disabled }: IButtonPaginateProps) => (
    <button
        disabled={disabled}
        type="button"
        className={`button-pagination ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={onClick}
    >
        {content}
    </button>
);

const Pagination: React.FC<IPagination> = ({ page, setPage, listItems, range }) => {
    const activePage = page;

    const handleFirstPage = useCallback(() => {
        setPage(1);
    }, [listItems.length, page]);

    const handlePrevPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [listItems.length, page]);

    const handleNextPage = useCallback(() => {
        if (page < listItems.length) {
            setPage(page + 1);
        }
    }, [listItems.length, page]);

    const handleLastPage = useCallback(() => {
        setPage(range.length);
    }, [listItems.length, page]);

    return (
        <div className="container-pagination">
            <span>{`Total de ${addZeroLeft(activePage)} de ${range.length} páginas`}</span>
            <div className="container-button-navigation">
                <ButtonPaginate
                    disabled={activePage === 1}
                    content={<FaAngleDoubleLeft />}
                    onClick={handleFirstPage}
                />
                <ButtonPaginate
                    disabled={activePage === 1}
                    content={<FaAngleLeft />}
                    onClick={handlePrevPage}
                />

                <ButtonPaginate
                    disabled={activePage === range.length}
                    onClick={handleNextPage}
                    content={<FaAngleRight />}
                />
                <ButtonPaginate
                    disabled={activePage === range.length}
                    onClick={handleLastPage}
                    content={<FaAngleDoubleRight />}
                />
            </div>
        </div>
    );
};
