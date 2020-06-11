import React from 'react';
import { Spinner } from 'reactstrap';
import "./Loader.css";

interface LoaderProps {
  loading: Boolean
}

const Loader:React.FC<LoaderProps> = ({loading}: LoaderProps) => (
    loading ? <div className="loader">
            <Spinner color="primary" />
        </div> : null
);

export default Loader;
