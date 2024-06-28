import { Admin, FetchHeaderType, FilterParams } from "./types";
export const API = {
  /**
   * Execute a query
   * @param url
   * @param method
   * @param body
   * @returns
   */
  execute: async (
    url: string,
    method: string = "GET",
    data?: string | null,
    token?: string,
  ) => {
    let headers: FetchHeaderType = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    let fetchPromises: Promise<Response | null> | null = null;
    fetchPromises = fetch(`http://localhost:8000/api/v1/en/${url}`, {
      method: method,
      headers,
      body: data,
    });

    if (fetchPromises !== null) {
      const res = await fetchPromises;
      if (res !== null) {
        return Promise.all([res.status, res.json(), res.ok]);
      }
    }
    return Promise.resolve([null, null, false, null]);
  }, //execute

  /**
   * Process the response after the query has been executed
   * @param res
   * @returns
   */
  processResponse: async (res: any[]) => {
    if (!res[2]) {
      throw new Error(res[1].message);
    }
    return await res[1].data;
  },

  /**
   *API request to for Admin login
   * @param data
   * @returns
   */
  signIn: async (data: Admin) => {
    console.log("url", `${process.env.NEXT_PUBLIC_BASE_URL}`);
    const res = await API.execute("auth/login", "POST", JSON.stringify(data));
    return res;
  },

  /**
   * API request to for Admin logout
   * @param token
   * @returns
   */

  signOut: async (token: string) => {
    const res = await API.execute("auth/logout", "GET", null, token);
    return res;
  },


  /**
   * API for superadmin to change password for admins
   * @param id 
   * @param data 
   * @param token 
   * @returns 
   */
  passwordReset: async (id: string, data: Partial<Admin>, token: string) => {
    const res = await API.execute(
      `admins/password/reset/${id}`,
      "POST",
      JSON.stringify(data),
      token,
    );
    return res;
  },

  /**
   *API request to get all users
   * @param token
   * @returns
   */
  getAllAdmins: async (token: string) => {
    const res = await API.execute("admins", "GET", null, token);
    return res;
  },

  /**
   *
   * @param token
   * @param data
   * @returns
   */

  createAdmin: async (data: Admin, token: string) => {
    const res = await API.execute(
      "admins/create",
      "POST",
      JSON.stringify(data),
      token,
    );
    return res;
  },

  /**
   * API request to delete a particular admin
   * @param token
   * @param id
   * @returns
   */

  deleteAdmin: async (token: string, id: string) => {
    const res = await API.execute(`admins/delete/${id}`, "DELETE", id, token);
    return res;
  },

  /**
   *API request to get all users
   * @param token
   * @returns
   */
  getAllEmployees: async (
    token: string,
    // page: number,
    filter_params: FilterParams,
  ) => {
    const url =
      `employees?matricule=${filter_params.matricule}&position=${filter_params.position}&department=${filter_params.department}&min_overtime=${filter_params.min_overtime}&min_absences=${filter_params.min_absences}&min_sick_days=${filter_params.min_sick_days}&page=${filter_params.page}`
        // ? `employees?matricule=${filter_params.matricule}&position=${filter_params.position}&department=${filter_params.department}&min_overtime=${filter_params.min_overtime}&min_absences=${filter_params.min_absences}&min_sick_days=${filter_params.min_sick_days}&page=${page}`
        // : `employees?page=${page}`;

    const res = await API.execute(url, "GET", null, token);
    return res;
  },

  /**
   * API request to to get employee attendances
   * @param id
   * @param token
   * @returns
   */
  getEmployeeAttendances: async (id: string, token: string) => {
    const res = await API.execute(
      `employees/attendances/${id}`,
      "GET",
      null,
      token,
    );
    return res;
  },

  /**
   * API request to to get employee monthly payment record for the current years
   * @param id
   * @param token
   * @returns
   */
  getEmployeePayments: async (id: string, token: string) => {
    console.log("response from payment   hghguyfg");
    const res = await API.execute(
      `employees/payments/${id}`,
      "GET",
      null,
      token,
    );
    return res;
  },
  /**
   * API request to get employee monthly payment record for the current years
   * @param token
   * @returns
   */
  getAnualPayments: async (token: string) => {
    const res = await API.execute(
      "payments/yearly-summary",
      "GET",
      null,
      token,
    );
    return res;
  },

  /**
   * API request to get most recentpayment record for the current years
   * @param token
   * @returns
   */
  getRecentPayments: async (token: string) => {
    console.log("response  for recent payment   hghguyfg");
    const res = await API.execute(
      "payments/most-recent-summary",
      "GET",
      null,
      token,
    );
    console.log("response for recent payment", res);

    return res;
  },

  /**
   * API request for make payment
   * @param token
   * @returns
   */
  makePayment: async (token: string) => {
    const res = await API.execute("make-payment", "POST", null, token);
    return res;
  },

  /**
   * API request for make payment
   * @param token
   * @returns
   */
  initiatePayment: async (token: string) => {
    const res = await API.execute("initiate-payment", "POST", null, token);
    return res;
  },
};
