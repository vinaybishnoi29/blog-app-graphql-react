import React from 'react';
import { Spinner } from 'reactstrap';

interface LoaderProps {
  loading: Boolean
}

export const Loader:React.FC<LoaderProps> = ({loading}: LoaderProps) => (
    loading ? <div className="loader">
            <Spinner color="primary" />
        </div> : null
)