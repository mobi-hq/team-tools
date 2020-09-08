import React, { useMemo } from 'react';
import Table from './table';

const Summary = ({
    menu_diff,
    category_diff,
    product_diff,
    modifier_group_diff,
    modifier_diff,
}) => {
    const columns = useMemo(
        () => [
            {
                Header: 'type',
                accessor: 'type',
            },
            {
                Header: 'added',
                accessor: 'added.length',
            },
            {
                Header: 'removed',
                accessor: 'removed.length',
            },
            {
                Header: 'changed',
                accessor: 'changed.length',
            },
        ],
        []
    );

    return (
        <div>
            <Table
                columns={columns}
                data={[
                    { type: 'menu', ...menu_diff },
                    { type: 'category', ...category_diff },
                    { type: 'product', ...product_diff },
                    { type: 'modifier_groups', ...modifier_group_diff },
                    { type: 'modifier', ...modifier_diff },
                ]}
            />
        </div>
    );
};

export default Summary;
