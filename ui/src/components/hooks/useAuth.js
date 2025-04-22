import { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from './useToken.js';

const useAuth = () => {
    return { user, loading };
};

export default useAuth;