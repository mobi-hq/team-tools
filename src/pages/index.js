import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
// import Image from "../components/image"
import SEO from '../components/seo';

const IndexPage = () => (
    <Layout>
        <SEO title="Index" />
        <Link to="/download-headoffice-menu-to-json/">
            download-headoffice-menu-to-json
        </Link>
        <br />
        <Link to="/diff-json-menus/">diff-json-menus</Link>
        <br />
        <Link to="/dooliz-menu-export-check/">dooliz-menu-export-check</Link>
    </Layout>
);

export default IndexPage;
