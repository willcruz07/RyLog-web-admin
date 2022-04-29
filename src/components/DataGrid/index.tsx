/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridRowsProp, GridColDef, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Colors } from '../../styles/variables';

import './styles.scss';

interface IDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
}

const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
};

export const Grid: React.FC<IDataGridProps> = ({ columns, rows, onDelete, onEdit }) => {
    const [listColumns, setListColumns] = useState<GridColDef[]>(columns);

    useEffect(() => {
        if (!!onEdit || !!onDelete) {
            setListColumns((list) => [...list, {
                field: 'action',
                headerName: 'Ação',
                headerAlign: 'center',
                align: 'center',
                sortable: false,
                renderCell: (params: GridCellParams) => (
                    <div className="container-data-grid__action">
                        {!!onEdit && (
                            <button
                                data-tip="Editar"
                                type="button"
                                onClick={() => onEdit(params.row)}
                            >
                                <FaEdit
                                    data-tip="Editar"
                                    className="icon-edit"
                                />
                            </button>
                        )}

                        {!!onDelete && (
                            <button
                                data-tip="Deletar"
                                type="button"
                                onClick={() => onDelete(params.row)}
                            >
                                <FaTrash
                                    data-tip="Deletar"
                                    className="icon-trash"
                                />
                            </button>
                        )}

                    </div>
                ),
            },
            ]);
        }
    }, []);

    return (
        <div className="container-data-grid">
            <DataGrid
                sx={{ borderColor: Colors.gray }}
                disableColumnFilter
                disableColumnMenu
                autoPageSize
                disableSelectionOnClick
                rows={rows}
                columns={listColumns}
                components={{ Pagination: CustomPagination }}
            />

        </div>
    );
};
