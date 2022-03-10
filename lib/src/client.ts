/**
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AuthClientConfig, Store, TokenResponse } from "@asgardeo/auth-js";
import { AsgardeoNodeCore } from "./core"
import { AuthURLCallback } from "./models";

/**
 * This class provides the necessary methods needed to implement authentication.
 *
 * @export
 * @class AsgardeoNodeClient
*/
export class AsgardeoNodeClient<T> {
    private _authCore: AsgardeoNodeCore<T>;

    /**
    * This is the constructor method that returns an instance of the `AsgardeoNodeClient` class.
    *
    * @param {AuthClientConfig<T>} config - The configuration object.
    * @param {Store} store - The store object.
    *
    * @example
    * ```
    * const _store: Store = new DataStore();
    * const _config = {
           signInRedirectURL: "http://localhost:3000/sign-in",
           signOutRedirectURL: "http://localhost:3000/dashboard",
           clientID: "client ID",
           serverOrigin: "https://api.asgardeo.io/t/<org_name>"
       };
    * const auth = new AsgardeoNodeClient(_config,_store);
    * ```
    *
    * @link https://github.com/asgardeo/asgardeo-auth-js-sdk/tree/master#constructor
    * @preserve
    */
    constructor(config: AuthClientConfig<T>, store?: Store) {
        this._authCore = new AsgardeoNodeCore(config, store);
    }

    /**
     * This method logs in a user. If the authorization code is not available it will resolve with the
     * authorization URL to authorize the user.
     * @param {string} authorizationCode - The authorization code obtained from Asgardeo after a user signs in.
     * @param {String} sessionState - The session state obtained from Asgardeo after a user signs in.
     * @param {string} userID - (Optional) A unique ID of the user to be authenticated. This is useful in multi-user
     * scenarios where each user should be uniquely identified.
     * @param {string} state - The state parameter in the redirect URL.
     *
     * @return {Promise<URLResponse | NodeTokenResponse>} - A Promise that resolves with the
     * [`URLResponse`](#URLResponse) object or a Promise that resolves with
     * the [`NodeTokenResponse`](#NodeTokenResponse) object.
     *
     * @example
     * ```
     * authClient.signIn(req.query.code, req.query.session_state).then(response => {
     *   //URL property will available if the user has not been authenticated already
     *   if (response.hasOwnProperty('url')) {
     *       res.redirect(response.url)
     *   } else {
     *       //Set the cookie
     *       res.cookie('ASGARDEO_SESSION_ID', response.session, { maxAge: 900000, httpOnly: true, SameSite: true });
     *       res.status(200).send(response)
     *   }
     *});
     * ```
     *
     * @link https://github.com/asgardeo/asgardeo-auth-js-sdk/tree/master#signIn
     *
     * @memberof AsgardeoNodeClient
     *
     */
    public async signIn(
        authURLCallback: AuthURLCallback,
        userId: string,
        authorizationCode?: string,
        sessionState?: string,
        state?: string,
        signInConfig?: Record<string, string | boolean>
    ): Promise<TokenResponse> {
        return this._authCore.signIn(authURLCallback, userId, authorizationCode, sessionState, state, signInConfig);
    }

    /**
     * This method clears all session data and returns the sign-out URL.
     * @param {string} userId - The userId of the user. (If you are using ExpressJS,
     * you may get this from the request cookies)
     *
     * @return {Promise<string>} - A Promise that resolves with the sign-out URL.
     *
     * @example
     * ```
     * const signOutUrl = await auth.signOut(userId);
     * ```
     *
     * @link https://github.com/asgardeo/asgardeo-auth-js-sdk/tree/master#signOut
     *
     * @memberof AsgardeoNodeClient
     *
     */
    public async signOut(userId: string): Promise<string> {
        return this._authCore.signOut(userId);
    }

    /**
     * This method returns a boolean value indicating if the user is authenticated or not.
     * @param {string} userId - The userId of the user.
     * (If you are using ExpressJS, you may get this from the request cookies)
     *
     * @return { Promise<boolean>} -A boolean value that indicates of the user is authenticated or not.
     *
     * @example
     * ```
     * const isAuth = await authClient.isAuthenticated("a2a2972c-51cd-5e9d-a9ae-058fae9f7927");
     * ```
     *
     * @link https://github.com/asgardeo/asgardeo-auth-js-sdk/tree/master#isAuthenticated
     *
     * @memberof AsgardeoNodeClient
     *
     */
    public async isAuthenticated(userId: string): Promise<boolean> {
        return this._authCore.isAuthenticated(userId);
    }

    /**
     * This method returns the id token.
     * @param {string} userId - The userId of the user.
     * (If you are using ExpressJS, you may get this from the request cookies)
     *
     * @return {Promise<string>} -A Promise that resolves with the ID Token.
     *
     * @example
     * ```
     * const isAuth = await authClient.getIDToken("a2a2972c-51cd-5e9d-a9ae-058fae9f7927");
     * ```
     *
     * @link https://github.com/asgardeo/asgardeo-auth-js-sdk/tree/master#getIDToken
     *
     * @memberof AsgardeoNodeClient
     *
     */
    public async getIDToken(userId: string): Promise<string> {
        return this._authCore.getIDToken(userId);
    }
}
