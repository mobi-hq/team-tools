import React, { useMemo } from 'react';
import DiffItem from './diff-item';
import Table from './table';

import styles from './index.module.less';

const CategoryDiff = ({ diff }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'backend name',
                accessor: 'backend_name',
            },
            {
                Header: 'name',
                accessor: 'name',
            },
            {
                Header: 'description',
                accessor: 'description',
            },
            {
                Header: 'tags',
                accessor: 'tags',
                Cell: ({ value }) => {
                    return (
                        <ul>
                            {value.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    );
                },
            },
            {
                Header: 'products',
                accessor: 'products',
                Cell: ({ value }) => {
                    return (
                        <ul>
                            {value.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    );
                },
            },
        ],
        []
    );
    const columns_changed = useMemo(
        () => [
            {
                Header: 'backend name',
                accessor: 'item.backend_name',
            },
            {
                Header: 'changes',
                accessor: 'changes',
                Cell: ({ value }) => {
                    return (
                        <ul>
                            {value.map((item) => {
                                return (
                                    <li key={item.path.join('.')}>
                                        <DiffItem item={item} />
                                    </li>
                                );
                            })}
                        </ul>
                    );
                },
            },
        ],
        []
    );
    return (
        <div className={styles.diffContainer}>
            {diff.added.length > 0 && (
                <>
                    <h3>added categories</h3>
                    <Table columns={columns} data={diff.added} />
                </>
            )}
            {diff.removed.length > 0 && (
                <>
                    <h3>removed categories</h3>
                    <Table columns={columns} data={diff.removed} />
                </>
            )}
            {diff.changed.length > 0 && (
                <>
                    <h3>changed categories</h3>
                    <Table columns={columns_changed} data={diff.changed} />
                </>
            )}
        </div>
    );
};

export default CategoryDiff;
