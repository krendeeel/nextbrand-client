import * as AuthActionCreators from './auth';
import * as CartActionCreators from './cart';
import * as ProductsActionCreators from './products';

export default {
    ...AuthActionCreators,
    ...CartActionCreators,
    ...ProductsActionCreators
}