# MCP – Model Context Protocol

## What is MCP?

**MCP (Model Context Protocol)** is a standard that allows AI agents (LLMs) to **interact with external tools, data, and prompts** in a structured way.

LLMs like ChatGPT can generate **text, images, audio**, but **cannot take actions by themselves**.  
MCP enables **AI agents** to:
- Make decisions
- Call tools (APIs, functions)
- Access resources (files, URLs, repos)
- Follow structured prompts

---

## Why Do We Need MCP?

Traditional LLMs:
- Respond only with text
- Do not directly interact with APIs or services

AI agents:
- Combine **conversation + reasoning**
- Extract structured information
- Interact with **third-party platforms**
- Execute actions (booking, searching, updating, etc.)

MCP acts as:
> A **guide and standard** that tells the agent **what tools exist**, **how to call them**, and **what data is available**

---

## Typical AI Agent Flow

1. User sends a request
2. Agent uses an LLM to extract intent and details
3. Agent calls tools or fetches resources
4. LLM helps decide the best action
5. Agent executes the action

### Example: Simple AI Flight Agent

```python
# Step 1: Read user input
user_input = input("Where do you want to fly?")

# Step 2: Extract flight details using LLM
prompt = [
    {"role": "system", "content": "extract destination, origin, and date"},
    {"role": "user", "content": user_input}
]
flight_query = call_llm(prompt)

# Step 3: Fetch flight options (mocked)
flight_options = fetch_flight_details()

# Step 4: Fetch user preferences (mocked)
user_prefs = fetch_user_preferences()

# Step 5: Ask LLM to choose the best flight
decision_prompt = [
    {"role": "system", "content": f"user_preferences: {user_prefs}"},
    {"role": "user", "content": f"available_flights: {flight_options}"}
]
decision = call_llm(decision_prompt)

# Step 6: Book flight (mocked)
def book_flight(flight):
    return f"Flight {flight['flight']} on {flight['airline']} booked!"

print(book_flight({"flight": "AG303", "airline": "AeroGo"}))

```


# MCP Core Concepts

This document provides an overview of the **Model Context Protocol (MCP)** core concepts and architecture.

---

## 1. Tools

**Tools** are actions that an MCP server exposes and that an AI agent can call.

Each tool includes:
- A **description**
- An **input schema**
- An **output schema**

### Examples
- `search_flights`
- `create_booking`
- `check_in`

Tools allow the AI agent to interact with external systems and perform concrete actions.

---

## 2. Resources

**Resources** are data sources used by the AI agent for decision-making and reasoning.

Each resource has:
- A **URI** (file path, GitHub repository, HTTPS endpoint, etc.)
- A **name / title**
- A **description**

### Examples
- Airports list
- Airlines data
- Company policies
- Weather information

Resources provide context and knowledge without performing actions.

---

## 3. Prompts

**Prompts** are predefined, structured prompts exposed by the MCP server.

They are used to:
- Optimize decisions
- Guide reasoning
- Standardize LLM behavior

### Examples
- Finding the best flight within a budget
- Handling travel disruptions
- Compensation reasoning

Prompts ensure consistent and reliable AI responses across use cases.

---

## MCP Architecture

MCP follows a **Client–Server architecture**.

### Components
- **MCP Server**  
  Exposes tools, resources, and prompts.
- **MCP Client / AI Agent**  
  Uses an LLM and communicates with the MCP server.

Communication between the client and server is done using **JSON-RPC**.

---

## JSON-RPC in MCP

**JSON-RPC** stands for *Remote Procedure Call using JSON*.


It allows a **client** to invoke a **server-side function remotely** by sending a structured JSON request.  
The server executes the function and returns the result in a standardized JSON response.

---

### Server-Side Function Example

This function exists on the server and is exposed as a callable method.

### Client Request Structure
A client sends a JSON request containing:
- `jsonrpc` version
- `method` name
- `params`
- `id`

### Server Response Structure
The server responds with:
- `jsonrpc` version
- `result`
- `id`
- Optional `error`

  

### Properties
- Stateless
- Transport-agnostic

### Supported Transports
- HTTP
- STDIO

---

# MCP Transport Modes & Server Basics

This document summarizes the key concepts explored in the MCP (Model Context Protocol) lab, including transport modes, server usage, SDKs, and testing tools.

---

## MCP Transport Modes

### 1. STDIO

**Simplest transport mode**

- Used for **local processes**
  - Examples: Cursor, Roo-Code
- No HTTP, no sockets
- Very fast and easy to set up
- Ideal for local development and experiments

---

### 2. HTTP

**Used for remote MCP servers**

- Requires a server URL
- Suitable for distributed or production systems
- Must consider:
  - Authentication
  - Data privacy
  - Network security

---

## Using an MCP Server

### Old Approach (Without MCP)

- You write code for **each API directly**
- Manually manage:
  - Endpoints
  - Tool logic
  - Context and workflows

---

### MCP Approach

- You call the **MCP server**
- MCP automatically handles:
  - API endpoints
  - Tool routing
  - Context management
  - Workflow orchestration

---

## MCP Workflow

1. Client connects to the MCP server  
2. Client asks for server capabilities  
3. Client calls tools and/or resources via MCP  
4. MCP handles all internal API logic  

---

## Example: MCP Flight Booking Server

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Flight Booking Server")

@mcp.resource("file://airports")
def get_airports():
    return {
        "LAX": {"name": "Los Angeles International", "city": "Los Angeles"},
        "JFK": {"name": "John F. Kennedy International", "city": "New York"},
        "LHR": {"name": "London Heathrow", "city": "London"}
    }

@mcp.tool()
def search_flights(origin: str, destination: str) -> dict:
    return {
        "flights": [
            {"id": "FL123", "price": 299},
            {"id": "FL456", "price": 399}
        ]
    }

@mcp.prompt()
def find_best_flight(budget: float) -> str:
    return f"Find the best flight under ${budget}"

if __name__ == "__main__":
    mcp.run()

```

## MCP Inspector

Before building a client, you can test your MCP server using **MCP Inspector**.

### Run the Inspector

```bash
npx model-context-inspector/inspector
```
## MCP SDKs

MCP provides Software Development Kits (SDKs) to simplify MCP server development and integration.

- **Python SDK:** `fastmcp`
- SDKs are also available for other programming languages

📌 Official specifications and SDKs:  
👉 https://modelcontextprotocol.io

---

## Lab Summary

This lab has been **successfully completed**. During the lab, the following topics were explored:

- A pre-built MCP flight booking server
- Roo-Code integration
- STDIO vs HTTP transport modes
- MCP server configuration and testing

---


# 🧪 Lab: Exploring and Connecting to MCP Servers  
## Flight Booking System

## 🎯 Lab Objective

In this lab, I connected to and explored an existing **Model Context Protocol (MCP)** server instead of building one from scratch.  
The goal was to understand how MCP servers expose **data and actions** to AI assistants through a real-world **flight booking system**.

---

## 🔍 What I Explored

By the end of this lab, I gained hands-on experience with:

- ✅ A pre-built Flight Booking MCP server  
- ✅ Roo-Code AI assistant integration  
- ✅ STDIO vs HTTP transport modes  
- ✅ MCP server configuration and testing  
- ✅ MCP Resources, Tools, and Prompts  
- ✅ Testing with MCP Inspector  

---

## 🧠 MCP Server Overview

An MCP server exposes **three core components**:

### 1️⃣ Resources (Read-only data)

Resources provide structured data that AI systems can query.

**Examples:**
- Airports list  
- Airlines information  
- Flight policies  
- Weather or maps  

➡️ Resources are **read-only** and identified using **URI schemes** (e.g. `file://airports`).

---

### 2️⃣ Tools (Actions)

Tools allow the AI to perform actions.

**Examples:**
- Search flights  
- Create a booking  
- Check in a passenger  

➡️ Tools accept parameters and return **structured outputs**.

---

### 3️⃣ Prompts (AI guidance)

Prompts define instruction templates that guide the AI’s reasoning.

**Examples:**
- Find the best flight within a budget  
- Handle flight disruptions empathetically  

➡️ Prompts help the AI choose the right tools and responses.

---

## 🧩 Flight Booking MCP Server (Provided Code)

I worked with a complete MCP server implemented using the **FastMCP Python SDK**:

```python
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Flight Booking Server")

```

### 📦 Defining MCP Resources
## ✈️ Airports Resource

```python
@mcp.resource("file://airports")
def get_airports():
    """Get list of available airports"""
    return {
        "LAX": {"name": "Los Angeles International", "city": "Los Angeles"},
        "JFK": {"name": "John F. Kennedy International", "city": "New York"},
        "LHR": {"name": "London Heathrow", "city": "London"}
    }


```

## 🏢 Airlines Resource

```python
@mcp.resource("file://airlines")
def get_airlines():
    """Get list of available airlines and their information"""
    return {
        "AA": {"name": "American Airlines", "country": "USA", "fleet_size": 950},
        "BA": {"name": "British Airways", "country": "UK", "fleet_size": 280},
        "DL": {"name": "Delta Air Lines", "country": "USA", "fleet_size": 860},
        "UA": {"name": "United Airlines", "country": "USA", "fleet_size": 790}
    }


```

📌 Important Notes

Resources must use a valid URI scheme (e.g. file://airports)

Resources are read-only

They provide context for AI decision-making

## 🛠️ Defining MCP Tools
### 🔍 Search Flights Tool

```python 
@mcp.tool()
def search_flights(origin: str, destination: str) -> dict:
    """Search for flights between two airports"""
    return {
        "flights": [
            {"id": "FL123", "origin": origin, "destination": destination, "price": 299},
            {"id": "FL456", "origin": origin, "destination": destination, "price": 399}
        ]
    }

```

### 🧾 Create Booking Tool
```python
@mcp.tool()
def create_booking(flight_id: str, passenger_name: str) -> dict:
    """Create a flight booking"""
    return {
        "booking_id": f"BK{flight_id[-3:]}",
        "flight_id": flight_id,
        "passenger": passenger_name,
        "status": "confirmed"
    }



```

✅ Tools:

Perform actions

Accept parameters

Return structured data

## 💬 Defining MCP Prompts
### ✨ Find Best Flight Prompt
```python
@mcp.prompt()
def find_best_flight(budget: float, preferences: str = "economy") -> str:
    """Generate a prompt for finding the best flight within budget"""
    return f"""Please help me find the best flight within a ${budget} budget.

My preferences: {preferences}

Please consider:
- Price (must be under ${budget})
- Flight duration
- Airline reputation
- Departure times

Use the search_flights tool to find available options and provide a recommendation with reasoning."""

```
### ⚠️ Handle Flight Disruption Prompt


```python
@mcp.prompt()
def handle_disruption(original_flight: str, reason: str) -> str:
    """Generate a prompt for handling flight disruptions"""
    return f"""A passenger's flight {original_flight} has been disrupted due to: {reason}

Please help resolve this by:
1. Understanding the passenger's situation
2. Finding alternative flight options using search_flights
3. Providing clear rebooking steps
4. Offering appropriate compensation if applicable

Be empathetic and solution-focused in your response."""


```

📌 Prompts:

Guide AI behavior

Encourage tool usage

Improve reasoning and user experience

### ▶️ Running the MCP Server


```python
if __name__ == "__main__":
    # Run in streamable HTTP mode for client connections
    mcp.run()



```

This starts the MCP server using HTTP transport, allowing external clients (such as Roo-Code or MCP Inspector) to connect.

###🔌 Roo-Code Integration

I edited the MCP server configuration and connected it to Roo-Code, allowing the AI assistant to:

Read MCP resources

Invoke tools

Follow prompts for decision-making

This simulated real-world AI agent workflows.

### 🔍 Testing with MCP Inspector

Before building a client, I tested the server using MCP Inspector:

```

npx @modelcontextprotocol/inspector

```

This launched a web interface where I could:

Browse resources

Execute tools

Test prompts

📌 MCP Inspector was essential for debugging and validation.

##🧰 Python Project Setup with UV
###📦 What is UV?

UV is a fast, modern Python package and project manager written in Rust.

###🚀 Why I Used UV for MCP

Officially recommended by MCP

10–100× faster than pip

Manages environments, dependencies, and Python versions

Uses pyproject.toml (modern standard)


## 🆚 UV vs Traditional Tools

| Traditional | UV Equivalent |
|------------|---------------|
| `pip install package` | `uv add package` |
| `python -m venv env` | `uv init project` |
| `pip install -r requirements.txt` | `uv sync` |

##🧪 Creating the MCP Project with UV
`
cd /home/lab-user
uv init flight-booking-server
cd flight-booking-server
uv add "mcp[cli]"
`
### ❓ Why these commands?

- `uv init` → creates a clean Python project  
- `mcp[cli]` → installs the MCP SDK and Inspector  
- Follows the official MCP workflow  

---

## ✅ Lab Checklist

- ✔️ `server.py` exists  
- ✔️ Resources use `@mcp.resource("file://...")`  
- ✔️ Tools use `@mcp.tool()`  
- ✔️ Prompts use `@mcp.prompt()`  
- ✔️ Server runs without errors  
- ✔️ MCP Inspector connects successfully  

---

## 🏁 Lab Summary

In this lab, I learned how to:

- Understand MCP server architecture  
- Use Resources, Tools, and Prompts effectively  
- Connect MCP servers to Roo-Code  
- Compare STDIO vs HTTP transport modes  
- Test MCP servers using MCP Inspector  
- Set up MCP projects using UV  













