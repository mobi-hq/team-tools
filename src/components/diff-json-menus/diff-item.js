import React from 'react';

import styles from './index.module.less';

const DiffItem = ({ item }) => {
    if (item.kind === 'D') {
        return (
            <>
                <span className={styles.code}>{item.path.join('.')}</span> was
                removed
            </>
        );
    }
    if (item.kind === 'E') {
        return (
            <>
                <span className={styles.code}>{item.path.join('.')}</span>{' '}
                changed from <span className={styles.code}>{item.lhs}</span> to{' '}
                <span className={styles.code}>{item.rhs}</span>
            </>
        );
    }
    if (item.kind === 'A') {
        return (
            <>
                in list{' '}
                <span className={styles.code}>{item.path.join('.')}</span>{' '}
                <DiffItem item={item.item} />
            </>
        );
    }
    if (item.kind === 'N') {
        return (
            <>
                new value <span className={styles.code}>{item.rhs}</span>
            </>
        );
    }
    return null;
};

export default DiffItem;
