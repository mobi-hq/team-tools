import React, { useState } from 'react';
import { diff } from 'deep-diff';
import _ from 'lodash';

import MenuDiff from 'components/diff-json-menus/menu-diff';
import CategoryDiff from 'components/diff-json-menus/category-diff';
import ProductDiff from 'components/diff-json-menus/product-diff';
import ModifierGroupDiff from 'components/diff-json-menus/modifier-group-diff';
import ModifierDiff from 'components/diff-json-menus/modifier-diff';
import Summary from 'components/diff-json-menus/summary';

import Layout from '../components/layout';
import SEO from '../components/seo';

import styles from './diff-json-menus.module.less';

const generateDiffForItemType = (menu_1, menu_2, item_type) => {
    const added_items = menu_2[item_type].filter(
        (item) =>
            !_.find(menu_1[item_type], { backend_name: item.backend_name })
    );

    const removed_items = menu_1[item_type].filter(
        (item) =>
            !_.find(menu_2[item_type], { backend_name: item.backend_name })
    );

    const changed_items = menu_2[item_type]
        .map((item) => {
            const old_item = _.find(menu_1[item_type], {
                backend_name: item.backend_name,
            });
            if (!old_item) {
                return null;
            }
            const changes = diff(old_item, item);
            if (!changes) {
                return null;
            }
            return {
                item,
                changes,
            };
        })
        .filter((item) => item);

    return {
        added: added_items,
        removed: removed_items,
        changed: changed_items,
    };
};

const generateDiff = (menu_1_content, menu_2_content) => {
    try {
        const menu_1 = JSON.parse(menu_1_content);
        const menu_2 = JSON.parse(menu_2_content);

        const menu_diff = generateDiffForItemType(menu_1, menu_2, 'menus');
        const category_diff = generateDiffForItemType(
            menu_1,
            menu_2,
            'categories'
        );
        const product_diff = generateDiffForItemType(
            menu_1,
            menu_2,
            'products'
        );
        const modifier_group_diff = generateDiffForItemType(
            menu_1,
            menu_2,
            'modifier_groups'
        );
        const modifier_diff = generateDiffForItemType(
            menu_1,
            menu_2,
            'modifiers'
        );

        return (
            <div>
                <Summary
                    menu_diff={menu_diff}
                    category_diff={category_diff}
                    product_diff={product_diff}
                    modifier_group_diff={modifier_group_diff}
                    modifier_diff={modifier_diff}
                />
                <MenuDiff diff={menu_diff} />
                <CategoryDiff diff={category_diff} />
                <ProductDiff diff={product_diff} />
                <ModifierGroupDiff diff={modifier_group_diff} />
                <ModifierDiff diff={modifier_diff} />
            </div>
        );
    } catch (e) {
        alert(e);
        throw e;
    }
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

const DiffJsonMenus = () => {
    const [menu_1_json, setMenu1Json] = useState('');
    const [menu_1_file, setMenu1File] = useState(null);
    const [menu_2_json, setMenu2Json] = useState('');
    const [menu_2_file, setMenu2File] = useState(null);
    const [diff_result, setDiffResult] = useState(null);

    return (
        <Layout>
            <SEO title="diff-json-menus" />
            <h2>diff-json-menus</h2>
            <div className={styles.inputContainer}>
                <div>
                    <MenuTextInput
                        name="menu-1"
                        value={menu_1_json}
                        setValue={setMenu1Json}
                    />
                    <br />
                    OR
                    <br />
                    <MenuFileInput setValue={setMenu1File} />
                </div>
                <div>
                    <MenuTextInput
                        name="menu-2"
                        value={menu_2_json}
                        setValue={setMenu2Json}
                    />
                    <br />
                    OR
                    <br />
                    <MenuFileInput setValue={setMenu2File} />
                </div>
            </div>

            <br />
            <button
                type="button"
                onClick={() => {
                    const menu_1_content = menu_1_json || menu_1_file;
                    const menu_2_content = menu_2_json || menu_2_file;

                    if (!menu_1_content || !menu_2_content) {
                        alert('missing input');
                        return;
                    }

                    setDiffResult(generateDiff(menu_1_content, menu_2_content));
                }}
            >
                diff
            </button>
            <br />
            <div className={styles.root}>{diff_result}</div>
        </Layout>
    );
};

export default DiffJsonMenus;
