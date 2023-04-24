import { Search } from "react-bootstrap-icons";
import { Input, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useAppDispatch } from "../../hooks/redux-hooks";
import { DataTableProps } from "../../types/tables-types";
import { Button } from "../buttons/Button";
import { TableWrapper } from "../styled-components/styled-containers";
import { DataTableStyleWrap } from './styled-elements';
import { dataLiveFilter, filterWithSubmit } from '../../redux/data-filter/actionCreator';

function DataTable({ filterOption, filterOnchange, rowSelection, tableData, columns }: DataTableProps) {
    const dispatch = useAppDispatch();
    const handleIdSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.currentTarget.value;
        dispatch(dataLiveFilter(id, 'id'));
    };
    const handleStatusSearch = (value: string) => {
        dispatch(dataLiveFilter(value, 'status'));
    };

    const handleDataUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        dispatch(dataLiveFilter(value, 'name'));
    };

    const handleSearch = () =>{
        const id = document.querySelector<HTMLInputElement>('.ninjadash-data-id')?.value;
        const status = document.querySelector<HTMLDivElement>('.ninjadash-data-status .ant-select-selection-item')?.title;
        if (id && status) {
            dispatch(filterWithSubmit(id, status));
        }
    };

    const prefix = <Search />;

    return (
        <DataTableStyleWrap>
            {filterOption ? (
                <div className="ninjadash-datatable-filter">
                    {!filterOnchange ? (
                        <div className="ninjadash-datatable-filter__left">
                            <div className="ninjadash-datatable-filter__input">
                                <span className="label">Id:</span>
                                <Input className="ninjadash-data-id" placeholder="Search with Id" />
                            </div>
                            <div className="ninjadash-datatable-filter__input">
                                <span className="label">Status:</span>
                                <Select style={{ width: 200 }} className="ninjadash-data-status" defaultValue="active">
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="deactiveted">Deactivated</Select.Option>
                                    <Select.Option value="blocked">Blocked</Select.Option>
                                </Select>
                            </div>
                            <div className="ninjadash-datatable-filter__action">
                                <Button type="primary" size="small" onClick={handleSearch} transparented>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="ninjadash-datatable-filter__left">
                            <div className="ninjadash-datatable-filter__input">
                                <span className="label">Id:</span>
                                <Input onChange={handleIdSearch} placeholder="Search with Id" />
                            </div>
                            <div className="ninjadash-datatable-filter__input">
                                <span className="label">Status:</span>
                                <Select onChange={handleStatusSearch} style={{ width: 200 }} defaultValue="active">
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="deactiveted">Deactivated</Select.Option>
                                    <Select.Option value="blocked">Blocked</Select.Option>
                                </Select>
                            </div>
                        </div>
                    )}
                    <div className="ninjadash-datatable-filter__right">
                        <Input onChange={handleDataUser} size="middle" placeholder="Search" prefix={prefix} />
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className="ninjadasj-datatable">
                <TableWrapper className="table-data-view table-responsive">
                    {rowSelection ? (
                        <Table
                            rowSelection={{
                                // type: state.selectionType,
                                // ...rowSelection,
                            }}
                            pagination={{ pageSize: 10, showSizeChanger: true }}
                            dataSource={tableData}
                            columns={columns}
                        />
                    ) : (
                        <Table pagination={{ pageSize: 10, showSizeChanger: true }} dataSource={tableData} columns={columns} />
                    )}
                </TableWrapper>
            </div>
        </DataTableStyleWrap>
    );
}

DataTable.propTypes = {
    filterOption: PropTypes.bool,
    filterOnchange: PropTypes.bool,
    rowSelection: PropTypes.bool,
    tableData: PropTypes.array,
    columns: PropTypes.array,
};
export default DataTable;
