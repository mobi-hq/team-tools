import React, { useState } from 'react';
import { Link } from 'gatsby';
import FileSaver from 'file-saver';
import moment from 'moment';

import Layout from '../components/layout';
import SEO from '../components/seo';

const DownloadHeadofficeMenuToJsonPage = () => {
    const [headoffice_id, setHeadOfficeId] = useState('');

    return (
        <Layout>
            <SEO title="download-headoffice-menu-to-json" />
            <h2>download-headoffice-menu-to-json</h2>
            <input
                type="text"
                value={headoffice_id}
                placeholder="HeadOffice ID"
                onChange={(e) => setHeadOfficeId(e.target.value)}
            />
            <button
                onClick={() => {
                    const url = `https://www.mobi2go.com/api/1/headoffice/${headoffice_id}/menu?export`;
                    const datetime_string = moment().format(
                        'YYYY-MM-DDTHH:mm:SS'
                    );
                    const name = `menu-export-${headoffice_id}-${datetime_string}`;
                    FileSaver.saveAs(url, name);
                }}
            >
                download
            </button>
        </Layout>
    );
};

export default DownloadHeadofficeMenuToJsonPage;
