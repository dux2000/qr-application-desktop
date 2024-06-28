const tokenManager = {
    getToken() {
        return localStorage.getItem("token");
    },

    setToken(token: string) {
        localStorage.setItem("token", token);
    },

    removeToken() {
        localStorage.removeItem("token");
    },

    getAuthHeaders() {
        const token = this.getToken();
        if (!token) {
            throw new Error("No token available");
        }
        return {
            headers: { authorization: `Bearer ${token}` }
        };
    }
}

export default tokenManager;