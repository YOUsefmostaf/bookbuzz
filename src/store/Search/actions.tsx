import {flatMap} from 'lodash';
import {useSelector} from 'react-redux';
import {getSearch} from '.';

const searchState = useSelector(getSearch);
