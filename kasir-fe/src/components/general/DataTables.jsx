'use client'
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { customStyles } from '../styles/datatable'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { isEmpty, token } from '@/utils/utils'

import Paper from '@mui/material/Paper'
import { Dropdown } from 'flowbite-react'
import { FaFilter } from 'react-icons/fa'

const error = console.error
console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return
    error(...args)
}

function Tables(props) {
    const { auth, onSelected, className, selectedRow, filter, onRowClick } = props
    const [data, setData] = useState({ data: [], total: 0 })
    const [page, setPage] = useState(1)

    const [colom, setColom] = useState(props.columns)
    const [colomFilter, setColomFilter] = useState([])
    const [filterColom, setFilterColom] = useState([])

    const countPerPage = 20
    const router = useRouter()

    const getList = async () => {
        try {
            const tokens = await token
            const useData = await axios
                .get(`${props.url}?page=${page}&per_page=${countPerPage}&delay=1&format=dt`, {
                    headers: {
                        Authorization: 'Bearer ' + tokens,
                        'Content-Type': 'application/json',
                    },
                })
                .catch((error) => {
                    console.log(error.message)
                })
            const main_data = useData.data
            setData(main_data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const setPages = () => {
        const seter_page = props.pages ?? 1
        setPage(seter_page)
    }

    useEffect(() => {
        getList()
    }, [page, props.refresh])

    useEffect(() => {
        if (props?.columns) {
            setColomFilter(
                props?.columns?.map((x) => {
                    return {
                        name: x?.name,
                        visible: !isEmpty(filter) && filter.includes(x?.name) ? false : true,
                    }
                }) ?? []
            )
        }
    }, [props.columns])

    const hendleUpdateFilter = (e, x) => {
        const updatedColomFilter = [...colomFilter]
        const index = updatedColomFilter.findIndex((item) => item.name === x.name)
        updatedColomFilter[index].visible = e.target.checked
        setColomFilter(updatedColomFilter)
    }

    useEffect(() => {
        const invisibleColumns = colomFilter.filter((colom) => colom.visible === false)
        const invisibleColumnNames = invisibleColumns.map((colom) => colom.name)
        setFilterColom(invisibleColumnNames)
    }, [colomFilter])

    return (
        <div className={`table-container ${className}`}>
            <div className="w-full flex justify-between items-center pt-2 pb-2 ">
                <h3>{props?.HeadflexStart && props?.HeadflexStart()}</h3>
                <div className="flex items-center">
                    {props?.HeadflexEnd && props?.HeadflexEnd()}
                    {filter && (
                        <div className="mr-1 ml-1">
                            <Dropdown dismissOnClick={false} label={<FaFilter />} color={`#111`} arrowIcon={false} size="sm">
                                {colomFilter?.map((x, i) => (
                                    <Dropdown.Item key={i} className="p-0 pl-1 pr-1">
                                        <input id={`${x?.name}`} className="w-3 h-3 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name={`${x?.name}`} defaultChecked={x.visible} onChange={(e) => hendleUpdateFilter(e, x)} />
                                        <label htmlFor={`${x?.name}`} className="text-sm">
                                            {x?.name}
                                        </label>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                    )}
                </div>
            </div>
            <Paper>
                <DataTable
                    columns={hideColumns(props.columns, filterColom)}
                    data={data.data}
                    customStyles={customStyles}
                    noHeader
                    noDataComponent="..."
                    pagination
                    selectableRows={selectedRow ?? true}
                    onSelectedRowsChange={(ev) => {
                        if (onSelected) onSelected(ev)
                    }}
                    paginationServer
                    paginationTotalRows={data.total}
                    paginationPerPage={countPerPage}
                    onRowClicked={onRowClick}
                    highlightOnHover
                    pointerOnHover
                    onChangePage={(rows) => setPage(rows)}
                />
            </Paper>
        </div>
    )
}

export const hideColumns = (columns, columnsToHide) => {
    return columns.filter((column) => {
        return !columnsToHide.includes(column.name)
    })
}

export default Tables
