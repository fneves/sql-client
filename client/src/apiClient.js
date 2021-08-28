const HEADERS = { "Content-type": "application/json; charset=UTF-8"}

const API = {
  fetchTables(connection) {
    return fetch('/api/tables', { method: "POST",
      body: JSON.stringify({ connection: connection }),
      headers: HEADERS
    })
  },

  execute(connection, query ) {
    return fetch('/api/execute', {
      method: "POST",
      body: JSON.stringify({ connection: connection, query: query }),
      headers: { "Content-type": "application/json; charset=UTF-8"}
    })
  },

  connect(connectionString) {
    return fetch('/api/connect', {
      method: "POST",
      body: JSON.stringify({connectionString: connectionString}),
      headers: HEADERS
    });
  }
}

export default API