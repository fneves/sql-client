import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  // fetching the GET route from the Express server which matches the GET route from server.js

export const executeQuery = createAsyncThunk(
  'connection/execute',
  async ({connection, query},{ rejectWithValue }) => {
    const response = await fetch('/api/execute', {
      method: "POST",
      body: JSON.stringify({ connection: connection, query: query }),
      headers: { "Content-type": "application/json; charset=UTF-8"}
    })

    const body = await response.json();

    if (response.status !== 200) {
      return rejectWithValue(`Could not execute query "${query}": ${body.error}`)
    } else {
      return body
    }
  }
)

export const fetchTables = createAsyncThunk(
  'connection/fetchTables',
  async(connection, { rejectWithValue }) => {
    const response = await fetch('/api/tables', { method: "POST",
      body: JSON.stringify({ connection: connection }),
      headers: { "Content-type": "application/json; charset=UTF-8"}
    })

    const body = await response.json();

    if (response.status !== 200) {
      rejectWithValue(`Could not fetch tables: ${body.message}`)
    } else {
      return body
    }
  }
)

export const initConnection = createAsyncThunk(
  'connection/init',
  async (connectionString, { rejectWithValue, dispatch }) => {
    const response = await fetch('/api/connect', { method: "POST",
      body: JSON.stringify({connectionString: connectionString}),
      headers: { "Content-type": "application/json; charset=UTF-8"}
    });

    const body = await response.json();

    if (response.status === 200) {
      dispatch(fetchTables(body.id))
      return body
    } else {
      return rejectWithValue(body.error)
    }
  }
)

export const connectionSlice = createSlice({
	name: 'connection',
	initialState: {
    isConnected:   false,
    connectionId:  null,
    status:        'idle',
    tables:        [],
    error:         null,
    results:       [],
    resultsFields: []
  },
	reducers: {
    clearErrors(state) {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initConnection.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(initConnection.fulfilled, (state, action) => {
        state.isConnected = true
        state.connectionId = action.payload.id
        // state.tables = action.payload.tables
        state.error = null
        state.status = 'idle'
      })
      .addCase(initConnection.rejected, (state, action) => {
        state.tables = []
        state.error = action.payload
        state.status = 'idle'
      })
      .addCase(fetchTables.pending, (state, _) => {
        state.status = 'loading'
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.tables = action.payload.tables
        state.error = null
        state.status = 'idle'
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.tables = []
        state.error = action.payload
        state.status = 'idle'
      })
      .addCase(executeQuery.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(executeQuery.fulfilled, (state, action) => {
        state.status = 'idle'
        state.resultsFields = action.payload.fields
        state.results = action.payload.results
      })
      .addCase(executeQuery.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'idle'
      })
  }
});

export const { clearErrors } = connectionSlice.actions;

export default connectionSlice.reducer;