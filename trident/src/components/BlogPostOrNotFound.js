
import React from 'react';

import PageNotFound from '../pages/PageNotFound';
import { useParams } from 'react-router-dom';


function BlogPostOrNotFound() {
    const { name } = useParams();
    if (name && name.endsWith('.html')) {
      // If the URL contains .html, render the BlogPost component
      return (<h2>Blog Content</h2>);
    }else{
        return <PageNotFound />;
    }
  }

  export default BlogPostOrNotFound;