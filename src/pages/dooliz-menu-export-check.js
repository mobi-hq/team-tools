import React, { useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

import styles from './dooliz-menu-export-check.module.less';

const parseMenuIdFromBackendName = (name) => {
    const result = /\[(?<menu_id>\d+)\].*/.exec(name);

    if (result && result.groups && result.groups.menu_id) {
        return result.groups.menu_id;
    }
    return null;
};

const detectErrors = (menu_content) => {
    const content = JSON.parse(menu_content);
    const errors = [];

    const menus = {};
    const categories = {};
    const products = {};
    const modifier_groups = {};
    const modifiers = {};

    const plus = {};

    content.menus.forEach((menu) => {
        if (menu.backend_name in menus) {
            errors.push({
                type: 'DUPLICATE',
                item_type: 'menu',
                id: menu.backend_name,
            });
            return;
        }
        menus[menu.backend_name] = menu;
    });

    content.categories.forEach((category) => {
        if (category.backend_name in categories) {
            errors.push({
                type: 'DUPLICATE',
                item_type: 'category',
                id: category.backend_name,
            });
            return;
        }
        categories[category.backend_name] = category;
    });

    content.products.forEach((product) => {
        if (product.backend_name in products) {
            errors.push({
                type: 'DUPLICATE',
                item_type: 'product',
                id: product.backend_name,
            });
            return;
        }
        products[product.backend_name] = product;
    });

    content.modifier_groups.forEach((modifier_group) => {
        if (modifier_group.backend_name in modifier_groups) {
            errors.push({
                type: 'DUPLICATE',
                item_type: 'modifier_group',
                id: modifier_group.backend_name,
            });
            return;
        }
        modifier_groups[modifier_group.backend_name] = modifier_group;
    });

    content.modifiers.forEach((modifier) => {
        if (modifier.backend_name in modifiers) {
            errors.push({
                type: 'DUPLICATE',
                item_type: 'modifier',
                id: modifier.backend_name,
            });
            return;
        }
        modifiers[modifier.backend_name] = modifier;
    });

    Object.keys(menus).forEach((key) => {
        const menu = menus[key];

        menu.categories.forEach((backend_name) => {
            if (!(backend_name in categories)) {
                errors.push({
                    type: 'MISSING',
                    item_type: 'category',
                    id: backend_name,
                });
            } else {
                categories[backend_name].used = true;
            }
        });
    });

    Object.keys(categories).forEach((key) => {
        const category = categories[key];

        category.products.forEach((backend_name) => {
            if (!(backend_name in products)) {
                errors.push({
                    type: 'MISSING',
                    item_type: 'product',
                    id: backend_name,
                });
            } else {
                products[backend_name].used = true;
            }
        });
    });

    Object.keys(products).forEach((key) => {
        const product = products[key];

        product.modifier_groups = product.modifier_groups || [];
        product.modifier_groups.forEach((backend_name) => {
            if (!(backend_name in modifier_groups)) {
                errors.push({
                    type: 'MISSING',
                    item_type: 'modifier_group',
                    id: backend_name,
                });
            } else {
                modifier_groups[backend_name].used = true;
            }
        });

        if (!('plu' in product) || !product.plu) {
            errors.push({
                type: 'EMPTY_PLU',
                item_type: 'product',
                id: key,
            });
        } else {
            const record = {
                item_type: 'product',
                item: product,
            };
            const menu_id = parseMenuIdFromBackendName(product.backend_name);
            const id = `${menu_id}_${product.plu}`;
            if (id in plus) {
                plus[id].push(record);
            } else {
                plus[id] = [record];
            }
        }
    });

    Object.keys(modifier_groups).forEach((key) => {
        const modifier_group = modifier_groups[key];

        modifier_group.modifiers.forEach((backend_name) => {
            if (!(backend_name in modifiers)) {
                errors.push({
                    type: 'MISSING',
                    item_type: 'modifier',
                    id: backend_name,
                });
            } else {
                modifiers[backend_name].used = true;
            }
        });
    });

    Object.keys(modifiers).forEach((key) => {
        const modifier = modifiers[key];

        if (!('plu' in modifier) || !modifier.plu) {
            errors.push({
                type: 'EMPTY_PLU',
                item_type: 'modifier',
                id: key,
            });
        } else {
            const record = {
                item_type: 'modifier',
                item: modifier,
            };
            const menu_id = parseMenuIdFromBackendName(modifier.backend_name);
            const id = `${menu_id}_${modifier.plu}`;
            if (id in plus) {
                plus[id].push(record);
            } else {
                plus[id] = [record];
            }
        }
    });

    Object.keys(plus).forEach((key) => {
        const records = plus[key];

        if (records.length === 1) {
            return;
        }

        errors.push({
            id: records[0].item.backend_name,
            type: 'DUPLICATE_PLU',
            records,
        });
    });

    Object.keys(categories).forEach((key) => {
        const category = categories[key];

        if (category.used !== true) {
            errors.push({
                type: 'UNUSED_ITEM',
                item_type: 'category',
                id: category.backend_name,
            });
        }
    });

    Object.keys(products).forEach((key) => {
        const product = products[key];

        if (product.used !== true) {
            errors.push({
                type: 'UNUSED_ITEM',
                item_type: 'product',
                id: product.backend_name,
            });
        }
    });

    Object.keys(modifier_groups).forEach((key) => {
        const modifier_group = modifier_groups[key];

        if (modifier_group.used !== true) {
            errors.push({
                type: 'UNUSED_ITEM',
                item_type: 'modifier_group',
                id: modifier_group.backend_name,
            });
        }
    });

    Object.keys(modifiers).forEach((key) => {
        const modifier = modifiers[key];

        if (modifier.used !== true) {
            errors.push({
                type: 'UNUSED_ITEM',
                item_type: 'modifier',
                id: modifier.backend_name,
            });
        }

        if (
            modifier.type &&
            !['boolean', 'size', 'quantity'].includes(modifier.type)
        ) {
            errors.push({
                type: 'INVALID_MODIFIER_TYPE',
                id: modifier.backend_name,
                modifier_type: modifier.type,
            });
        }
    });

    return errors;
};

const MenuTextInput = ({ name, value, setValue }) => {
    return (
        <>
            <label htmlFor={name}>JSON {name}</label>
            <br />
            <textarea
                id={name}
                placeholder={name}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </>
    );
};

const MenuFileInput = ({ setValue }) => {
    return (
        <>
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = function () {
                            const file_content = reader.result;
                            setValue(file_content);
                        };
                        reader.readAsText(e.target.files[0]);
                    } else {
                        setValue(null);
                    }
                }}
            />
        </>
    );
};

const DoolizMenuExportCheck = () => {
    const [menu_json, setMenuJson] = useState('');
    const [menu_file, setMenuFile] = useState(null);
    const [errors, setErrors] = useState(null);

    return (
        <Layout>
            <SEO title="dooliz-menu-export-check" />
            <h2>dooliz-menu-export-check</h2>
            <div>
                <MenuTextInput
                    name="menu"
                    value={menu_json}
                    setValue={setMenuJson}
                />
                <br />
                OR
                <br />
                <MenuFileInput setValue={setMenuFile} />
            </div>

            <br />
            <button
                type="button"
                onClick={() => {
                    const menu_content = menu_json || menu_file;

                    if (!menu_content) {
                        alert('missing input');
                        return;
                    }

                    try {
                        setErrors(detectErrors(menu_content));
                    } catch (e) {
                        alert(e);
                    }
                }}
            >
                Detect errors
            </button>
            <br />
            {errors && errors.length === 0 && (
                <div className={styles.success}>No errors</div>
            )}
            {errors && errors.length > 0 && (
                <div>
                    {errors.map((error) => {
                        const key = error.type + error.id;
                        switch (error.type) {
                            case 'DUPLICATE':
                                return (
                                    <div className={styles.error} key={key}>
                                        Duplicate{' '}
                                        <span className={styles.item_type}>
                                            {error.item_type}
                                        </span>{' '}
                                        named{' '}
                                        <span className={styles.item_name}>
                                            {error.id}
                                        </span>
                                    </div>
                                );
                            case 'MISSING':
                                return (
                                    <div className={styles.error} key={key}>
                                        Missing{' '}
                                        <span className={styles.item_type}>
                                            {error.item_type}
                                        </span>{' '}
                                        named{' '}
                                        <span className={styles.item_name}>
                                            {error.id}
                                        </span>
                                    </div>
                                );
                            case 'EMPTY_PLU':
                                return (
                                    <div className={styles.error} key={key}>
                                        No PLU set for{' '}
                                        <span className={styles.item_type}>
                                            {error.item_type}
                                        </span>{' '}
                                        named{' '}
                                        <span className={styles.item_name}>
                                            {error.id}
                                        </span>
                                    </div>
                                );
                            case 'DUPLICATE_PLU':
                                return (
                                    <div className={styles.error} key={key}>
                                        Multiple items with the same plu{' '}
                                        <span className={styles.item_type}>
                                            {error.records[0].item.plu}
                                        </span>{' '}
                                        named{' '}
                                        <ul>
                                            {error.records.map((record) => {
                                                return (
                                                    <li
                                                        key={
                                                            record.item
                                                                .backend_name
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.item_name
                                                            }
                                                        >
                                                            ({record.item_type})
                                                            {
                                                                record.item
                                                                    .backend_name
                                                            }
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                );
                            case 'UNUSED_ITEM':
                                return (
                                    <div className={styles.error} key={key}>
                                        Unused{' '}
                                        <span className={styles.item_type}>
                                            {error.item_type}
                                        </span>{' '}
                                        named{' '}
                                        <span className={styles.item_name}>
                                            {error.id}
                                        </span>
                                    </div>
                                );
                            case 'INVALID_MODIFIER_TYPE':
                                return (
                                    <div className={styles.error} key={key}>
                                        Invalid type{' '}
                                        <span className={styles.item_type}>
                                            {error.modifier_type}
                                        </span>{' '}
                                        for modifier named{' '}
                                        <span className={styles.item_name}>
                                            {error.id}
                                        </span>
                                    </div>
                                );
                            default:
                        }
                        return null;
                    })}
                </div>
            )}
        </Layout>
    );
};

export default DoolizMenuExportCheck;
