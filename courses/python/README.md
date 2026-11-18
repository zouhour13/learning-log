# Python — Technical Interview Handbook

> **Level:** Beginner to intermediate  
> **Target roles:** Junior Python Developer, Backend Developer, AI Engineer, Machine Learning Engineer, Full-Stack Developer  
> **Purpose:** A practical revision guide for technical assessments and interviews.

This guide covers Python language fundamentals, data structures, problem-solving, object-oriented programming, runtime behavior, backend development, testing, SQL integration, and Python's role in data science and Generative AI.

**How to use it:** For each topic, practise four things: define it, explain when you would use it, write a small example without assistance, and identify one common pitfall.

---

## Contents

1. [Python fundamentals](#1-python-fundamentals)
2. [Core data structures](#2-core-data-structures)
3. [Control flow and iteration](#3-control-flow-and-iteration)
4. [Functions](#4-functions)
5. [Comprehensions and built-ins](#5-comprehensions-and-built-ins)
6. [Object-oriented programming](#6-object-oriented-programming)
7. [Exceptions and file handling](#7-exceptions-and-file-handling)
8. [Iterators, generators, and decorators](#8-iterators-generators-and-decorators)
9. [Memory, copying, and object model](#9-memory-copying-and-the-object-model)
10. [Algorithmic complexity](#10-algorithmic-complexity)
11. [Advanced Python and concurrency](#11-advanced-python-and-concurrency)
12. [Modules, environments, and packaging](#12-modules-environments-and-packaging)
13. [SQL and database access](#13-sql-and-database-access)
14. [FastAPI and backend development](#14-fastapi-and-backend-development)
15. [Testing and debugging](#15-testing-and-debugging)
16. [Python for data science and ML](#16-python-for-data-science-and-machine-learning)
17. [Python for LLMs and Generative AI](#17-python-for-llms-and-generative-ai)
18. [Common coding exercises](#18-common-coding-exercises)
19. [Frequently asked interview questions](#19-frequently-asked-interview-questions)
20. [Final revision checklist](#20-final-revision-checklist)

---

# 1. Python fundamentals

## 1.1 What is Python?

Python is a high-level, general-purpose programming language known for readable syntax and a large ecosystem. It supports procedural, object-oriented, and functional programming styles.

It is widely used for:
- Backend development and APIs.
- Data analysis and data engineering.
- Machine learning and deep learning.
- Automation and scripting.
- Generative AI and LLM applications.

**Why is Python popular in AI?** Its ecosystem includes NumPy, Pandas, Scikit-learn, PyTorch, TensorFlow, FastAPI, and libraries for model and API integration.

## 1.2 Is Python compiled or interpreted?

The usual short answer is that Python is an interpreted language. More precisely, in the standard CPython implementation, source code is compiled into bytecode, which is then executed by the Python virtual machine. Avoid saying that Python is never compiled.

## 1.3 Variables and dynamic typing

A variable is a name bound to an object. Python is dynamically typed: the type is associated with the object at runtime, and a name can later refer to an object of another type.

\`\`\`python
value = 42
value = "Python"
print(type(value))  # <class 'str'>
\`\`\`

Python is also strongly typed: it does not freely combine incompatible types.

\`\`\`python
"age: " + str(24)  # Explicit conversion
# "age: " + 24     # TypeError
\`\`\`

## 1.4 Built-in data types

| Type | Example | Description |
|---|---|---|
| \`int\` | \`42\` | Integer |
| \`float\` | \`3.14\` | Floating-point number |
| \`complex\` | \`2 + 3j\` | Complex number |
| \`str\` | \`"hello"\` | Text |
| \`bool\` | \`True\` | Boolean |
| \`NoneType\` | \`None\` | Absence of a value |
| \`list\` | \`[1, 2]\` | Ordered, mutable sequence |
| \`tuple\` | \`(1, 2)\` | Ordered, immutable sequence |
| \`set\` | \`{1, 2}\` | Collection of unique hashable elements |
| \`dict\` | \`{"a": 1}\` | Insertion-ordered key-value mapping |

Check a type with \`type(value)\`; check compatibility with \`isinstance(value, SomeType)\`.

## 1.5 Mutable vs immutable

- **Mutable:** the object can be changed after creation. Examples: list, dict, set.
- **Immutable:** the object cannot be changed after creation. Examples: int, float, bool, str, tuple, frozenset.

\`\`\`python
items = [1, 2]
items.append(3)       # Allowed

text = "Python"
# text[0] = "J"       # TypeError: strings are immutable
\`\`\`

Important nuance: a tuple is immutable, but it may contain a mutable object. The tuple cannot replace the reference, while the nested object may still change.

\`\`\`python
data = ([1, 2], "fixed")
data[0].append(3)     # Allowed
\`\`\`

## 1.6 Operators

**Arithmetic:** \`+\`, \`-\`, \`*\`, \`/\`, \`//\`, \`%\`, \`**\`.

- \`/\`: true division.
- \`//\`: floor division.
- \`%\`: remainder.
- \`**\`: exponentiation.

**Comparison:** \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`.

**Logical:** \`and\`, \`or\`, \`not\`.

**Membership:** \`in\`, \`not in\`.

**Identity:** \`is\`, \`is not\`.

Crucial distinction:
- \`==\` compares values for equality.
- \`is\` checks whether two references point to the same object.

\`\`\`python
a = [1, 2]
b = [1, 2]
print(a == b)  # True
print(a is b)  # False
print(a is None)  # Preferred None check
\`\`\`

---

# 2. Core data structures

## 2.1 List

A list is an ordered, mutable sequence. It allows duplicate values and mixed element types.

\`\`\`python
skills = ["Python", "FastAPI", "SQL"]

skills.append("React")          # Add one item
skills.extend(["Docker", "Git"]) # Add items from an iterable
skills.insert(1, "PostgreSQL")   # Insert at an index

skills.remove("SQL")             # Remove first matching value
last = skills.pop()              # Remove and return last item
first = skills.pop(0)            # Remove and return item at index 0

print(len(skills))
\`\`\`

### Indexing and slicing

\`\`\`python
numbers = [10, 20, 30, 40, 50]

numbers[0]      # 10
numbers[-1]     # 50
numbers[1:4]    # [20, 30, 40] — end index is excluded
numbers[:3]     # [10, 20, 30]
numbers[2:]     # [30, 40, 50]
numbers[::-1]   # Reversed copy
\`\`\`

### \`append()\` vs \`extend()\`

\`\`\`python
items = [1, 2]
items.append([3, 4])  # [1, 2, [3, 4]]

items = [1, 2]
items.extend([3, 4])  # [1, 2, 3, 4]
\`\`\`

## 2.2 Tuple

A tuple is an ordered, immutable sequence. It is useful for fixed records, coordinates, or values that should not be reassigned.

\`\`\`python
coordinates = (36.8, 10.2)
latitude = coordinates[0]

single_item = (5,)  # Comma is required for a one-element tuple
\`\`\`

## 2.3 Dictionary

A dictionary stores key-value pairs. Keys must be hashable; keys are unique. Dictionaries preserve insertion order in modern Python (language guarantee since Python 3.7).

\`\`\`python
user = {"name": "Zouhour", "role": "Engineer"}

user["name"]                  # Read by key
user.get("age")               # None if missing
user.get("age", 0)            # Custom default
user["city"] = "Tunis"        # Add or update
user.update({"active": True}) # Add/update multiple pairs
user.pop("role")              # Remove and return value
\`\`\`

Accessing a missing key with \`user["age"]\` raises \`KeyError\`; \`user.get("age")\` returns \`None\` by default.

Loop through a dictionary:

\`\`\`python
for key, value in user.items():
    print(key, value)

for key in user:
    print(key)

for value in user.values():
    print(value)
\`\`\`

### Frequency counting — essential interview pattern

\`\`\`python
numbers = [2, 5, 2, 8, 5, 2, 9]
counts = {}

for number in numbers:
    counts[number] = counts.get(number, 0) + 1

print(counts)  # {2: 3, 5: 2, 8: 1, 9: 1}
\`\`\`

Alternative: \`collections.Counter(numbers)\`. In a basic assessment, practise the dictionary-and-loop implementation first.

## 2.4 Set

A set is a mutable collection of unique, hashable elements. It does not support positional indexing and should not be relied on for a meaningful order.

\`\`\`python
values = {1, 2, 2, 3}  # {1, 2, 3}
values.add(4)
values.remove(2)       # KeyError if absent
values.discard(99)     # No error if absent
\`\`\`

Set operations:

\`\`\`python
a = {1, 2, 3}
b = {3, 4, 5}

a | b  # Union: {1, 2, 3, 4, 5}
a & b  # Intersection: {3}
a - b  # Difference: {1, 2}
a ^ b  # Symmetric difference: {1, 2, 4, 5}
\`\`\`

Use sets for deduplication and fast average-case membership checks.

## 2.5 Data structure comparison

| Structure | Ordered? | Mutable? | Duplicates? | Typical use |
|---|---|---|---|---|
| List | Yes | Yes | Yes | Sequence that changes |
| Tuple | Yes | No | Yes | Fixed sequence |
| Set | No positional order | Yes | No | Uniqueness and membership |
| Dict | Insertion order | Yes | Keys: no | Key-value lookup |

Average-case membership:
- List: O(n), because elements may need to be scanned.
- Set: O(1) average case, using hashing.
- Dictionary key lookup: O(1) average case.

---

# 3. Control flow and iteration

## 3.1 Conditionals

\`\`\`python
score = 75

if score >= 80:
    result = "Excellent"
elif score >= 50:
    result = "Pass"
else:
    result = "Fail"
\`\`\`

Python uses indentation to define blocks.

## 3.2 For and while loops

\`\`\`python
for number in [1, 2, 3]:
    print(number)

for index in range(5):  # 0 through 4
    print(index)

count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`

## 3.3 break, continue, pass

- \`break\`: exits the nearest loop.
- \`continue\`: skips to the next iteration.
- \`pass\`: does nothing; it is a placeholder.

## 3.4 enumerate() and zip()

\`\`\`python
skills = ["Python", "SQL", "FastAPI"]

for index, skill in enumerate(skills, start=1):
    print(index, skill)

names = ["Ali", "Sara"]
scores = [15, 18]

for name, score in zip(names, scores):
    print(name, score)
\`\`\`

By default, \`zip()\` stops at the shortest iterable. Use \`strict=True\` (Python 3.10+) when unequal lengths should raise an error.

---

# 4. Functions

A function is a reusable block of code that performs a specific task.

\`\`\`python
def add(a, b):
    return a + b

result = add(2, 3)
\`\`\`

## 4.1 Parameters, arguments, return, and print

- **Parameter:** name in the function definition.
- **Argument:** value passed when calling the function.
- \`return\`: sends a result back to the caller and ends the function.
- \`print()\`: displays output; it does not return that displayed value.

A function without an explicit return statement returns \`None\`.

## 4.2 Default and keyword arguments

\`\`\`python
def greet(name="Guest"):
    return f"Hello, {name}"

greet()
greet(name="Zouhour")
\`\`\`

## 4.3 *args and **kwargs

- \`*args\`: collects extra positional arguments into a tuple.
- \`**kwargs\`: collects extra keyword arguments into a dictionary.

\`\`\`python
def total(*numbers):
    return sum(numbers)

def describe_user(**details):
    for key, value in details.items():
        print(key, value)

total(1, 2, 3)
describe_user(name="Zouhour", role="Engineer")
\`\`\`

## 4.4 Lambda functions

A lambda is a small anonymous expression, often used for short callbacks or sort keys.

\`\`\`python
square = lambda x: x ** 2

users = [
    {"name": "Ali", "age": 25},
    {"name": "Sara", "age": 20},
]
users.sort(key=lambda user: user["age"])
\`\`\`

Prefer a normal \`def\` for complex logic.

## 4.5 Scope: local, enclosing, global, built-in

Python resolves names using the LEGB rule:
1. Local
2. Enclosing function
3. Global module
4. Built-in

Use \`global\` or \`nonlocal\` only when reassignment at those scopes is genuinely required. Avoid unnecessary global mutable state.

## 4.6 Mutable default argument trap

Incorrect:

\`\`\`python
def add_item(item, items=[]):
    items.append(item)
    return items
\`\`\`

The same default list is reused across calls. Correct pattern:

\`\`\`python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
\`\`\`

This is a frequent interview question.

---

# 5. Comprehensions and built-ins

## 5.1 List comprehension

\`\`\`python
numbers = [1, 2, 3, 4, 5]

squares = [n ** 2 for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
\`\`\`

Equivalent loop:

\`\`\`python
squares = []
for n in numbers:
    squares.append(n ** 2)
\`\`\`

## 5.2 Dictionary and set comprehensions

\`\`\`python
squares_by_number = {n: n ** 2 for n in range(1, 4)}
unique_lengths = {len(word) for word in ["AI", "Python", "SQL"]}
\`\`\`

## 5.3 Useful built-in functions

| Function | Purpose |
|---|---|
| \`len(x)\` | Number of elements |
| \`sum(x)\` | Sum of numeric elements |
| \`min(x)\`, \`max(x)\` | Smallest/largest |
| \`sorted(x)\` | New sorted list |
| \`reversed(x)\` | Reverse iterator |
| \`enumerate(x)\` | Index-value pairs |
| \`zip(a, b)\` | Pair items from iterables |
| \`any(x)\` | True if at least one item is truthy |
| \`all(x)\` | True if every item is truthy |
| \`abs(x)\` | Absolute value |
| \`round(x, n)\` | Round a number |
| \`isinstance(x, T)\` | Type compatibility check |

\`list.sort()\` sorts a list in place and returns \`None\`; \`sorted()\` returns a new list.

---

# 6. Object-oriented programming

OOP organizes software around objects that combine state (data) and behavior (methods).

## 6.1 Class and object

- **Class:** blueprint defining attributes and methods.
- **Object:** instance of a class.
- \`self\`: reference to the current instance.
- \`__init__\`: initializer called when an instance is created.

\`\`\`python
class Developer:
    def __init__(self, name, skills):
        self.name = name
        self.skills = skills

    def introduce(self):
        return f"I am {self.name}"

developer = Developer("Zouhour", ["Python", "FastAPI"])
print(developer.introduce())
\`\`\`

## 6.2 Four pillars of OOP

### Encapsulation

Keep related data and behavior together and provide controlled access to implementation details. Python conventions:
- \`name\`: public.
- \`_name\`: intended for internal use.
- \`__name\`: name-mangled to reduce accidental subclass/name conflicts; not true private access control.

### Inheritance

A child class can reuse and specialize behavior from a parent class.

\`\`\`python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof"
\`\`\`

### Polymorphism

Different objects can respond to the same operation through their own implementations.

\`\`\`python
class Cat:
    def speak(self):
        return "Meow"

class Dog:
    def speak(self):
        return "Woof"

for animal in [Cat(), Dog()]:
    print(animal.speak())
\`\`\`

### Abstraction

Expose essential behavior while hiding implementation details. Python supports abstract base classes through \`abc\`.

\`\`\`python
from abc import ABC, abstractmethod

class Predictor(ABC):
    @abstractmethod
    def predict(self, features):
        pass

class RulePredictor(Predictor):
    def predict(self, features):
        return "class-A"
\`\`\`

## 6.3 Instance attributes vs class attributes

\`\`\`python
class Employee:
    company = "Example Ltd"  # Class attribute

    def __init__(self, name):
        self.name = name     # Instance attribute
\`\`\`

Class attributes are shared through the class unless shadowed; instance attributes belong to individual instances.

## 6.4 Instance, class, and static methods

\`\`\`python
class Example:
    count = 0

    def instance_method(self):
        return self

    @classmethod
    def class_method(cls):
        return cls.count

    @staticmethod
    def add(a, b):
        return a + b
\`\`\`

- Instance method receives \`self\`.
- Class method receives \`cls\`.
- Static method receives no implicit instance or class argument.

## 6.5 Composition vs inheritance

- Inheritance: an **is-a** relationship (a Dog is an Animal).
- Composition: a **has-a** relationship (a Car has an Engine).

Prefer composition when an object should use another component without being a specialized version of it.

---

# 7. Exceptions and file handling

## 7.1 Exception handling

An exception is an event that interrupts normal program flow.

\`\`\`python
try:
    number = int("12")
    result = 10 / number
except ValueError:
    print("Invalid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print(result)             # Runs if no exception occurred
finally:
    print("Cleanup / final step")
\`\`\`

- \`try\`: potentially failing code.
- \`except\`: handles selected exceptions.
- \`else\`: runs if the try block completed without an exception.
- \`finally\`: runs whether or not an exception occurred; useful for cleanup.

Raise an exception deliberately:

\`\`\`python
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
\`\`\`

Common exceptions:

| Exception | Typical cause |
|---|---|
| \`ValueError\` | Valid type, invalid value |
| \`TypeError\` | Incompatible operation or argument type |
| \`KeyError\` | Missing dictionary key |
| \`IndexError\` | Invalid sequence index |
| \`FileNotFoundError\` | File does not exist |
| \`ZeroDivisionError\` | Division by zero |
| \`AttributeError\` | Attribute does not exist |

Catch specific exceptions rather than using a broad \`except Exception\` without a reason.

## 7.2 File handling

Use a context manager (\`with\`) so the file is closed even if an error occurs.

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

Common modes:
- \`r\`: read.
- \`w\`: write, truncating an existing file.
- \`a\`: append.
- \`x\`: create, failing if the file already exists.
- \`b\`: binary mode.

## 7.3 JSON

\`\`\`python
import json

data = {"name": "Zouhour", "role": "Engineer"}

json_text = json.dumps(data)       # Python object -> JSON string
parsed = json.loads(json_text)     # JSON string -> Python object

with open("user.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2)

with open("user.json", encoding="utf-8") as file:
    loaded = json.load(file)
\`\`\`

Remember:
- \`dumps\` / \`loads\`: string operations.
- \`dump\` / \`load\`: file-like object operations.

---

# 8. Iterators, generators, and decorators

## 8.1 Iterable vs iterator

An **iterable** can provide an iterator (for example, list, tuple, string, dictionary). An **iterator** produces values one at a time using \`next()\`.

\`\`\`python
numbers = [10, 20, 30]
iterator = iter(numbers)

print(next(iterator))  # 10
print(next(iterator))  # 20
\`\`\`

When exhausted, an iterator raises \`StopIteration\`.

## 8.2 Generators

A generator function uses \`yield\` to produce values lazily, one at a time.

\`\`\`python
def generate_numbers(limit):
    for number in range(limit):
        yield number

for number in generate_numbers(3):
    print(number)
\`\`\`

A generator expression uses parentheses:

\`\`\`python
squares = (number ** 2 for number in range(1_000_000))
\`\`\`

**Why use generators?** They can reduce memory use when processing large or streaming data because values are produced on demand. They are usually consumed once.

## 8.3 Decorators

A decorator wraps a function to add behavior without changing the function's core implementation.

\`\`\`python
from functools import wraps

def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Starting")
        result = func(*args, **kwargs)
        print("Finished")
        return result
    return wrapper

@log_call
def greet(name):
    return f"Hello, {name}"
\`\`\`

Common uses: logging, timing, caching, authorization, and framework route registration. \`functools.wraps\` preserves useful metadata from the wrapped function.

---

# 9. Memory, copying, and the object model

## 9.1 Names and references

Python variables are names bound to objects. Assignment does not automatically create a copy.

\`\`\`python
a = [1, 2]
b = a
b.append(3)
print(a)  # [1, 2, 3] — same list object
\`\`\`

## 9.2 Shallow copy vs deep copy

\`\`\`python
import copy

original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)
\`\`\`

- Shallow copy: new outer container, but nested objects are shared.
- Deep copy: recursively copies nested objects (subject to object-specific copy behavior).

## 9.3 Garbage collection

Python manages memory automatically. CPython primarily uses reference counting and also has a cyclic garbage collector to detect reference cycles. Avoid saying that garbage collection means objects are always freed immediately.

## 9.4 Hashability

A hashable object has a hash value that remains stable during its lifetime and supports equality comparisons. Hashable objects can be dictionary keys and set elements. Immutable built-in values such as strings and integers are hashable; mutable lists and dictionaries are not.

---

# 10. Algorithmic complexity

Big O describes how time or space requirements grow as input size grows. It is not an exact measurement of execution time.

| Complexity | Name | Example |
|---|---|---|
| O(1) | Constant | List index access |
| O(log n) | Logarithmic | Binary search on sorted data |
| O(n) | Linear | Scan a list |
| O(n log n) | Linearithmic | Efficient comparison sorting |
| O(n²) | Quadratic | Compare every pair using nested loops |

Examples:

\`\`\`python
items = [4, 8, 2, 9]

first = items[0]           # O(1)
exists = 8 in items        # O(n) for list membership

for item in items:         # O(n)
    print(item)

for left in items:         # O(n²) total
    for right in items:
        print(left, right)
\`\`\`

Common average-case complexities:
- List append: O(1) amortized.
- List membership: O(n).
- Dictionary lookup: O(1) average, O(n) worst case.
- Set membership: O(1) average, O(n) worst case.
- Sorting: O(n log n) worst case for Python's built-in sort.

**Interview habit:** Explain both the algorithm and its complexity. Consider edge cases and memory usage too.

---

# 11. Advanced Python and concurrency

## 11.1 GIL

The Global Interpreter Lock (GIL) in traditional CPython builds allows only one thread at a time to execute Python bytecode within a process. This limits CPU-bound parallel execution using threads in those builds.

Be precise: optional free-threaded CPython builds are available in modern Python versions, so the GIL statement is not universal across every build or Python implementation.

## 11.2 Threading vs multiprocessing vs asyncio

| Approach | Model | Often useful for |
|---|---|---|
| Threading | Multiple threads in one process, shared memory | I/O-bound tasks |
| Multiprocessing | Multiple processes, separate memory spaces | CPU-bound parallel work |
| Asyncio | Cooperative concurrency using an event loop | Many concurrent I/O operations |

These are not interchangeable. Choose based on the workload and libraries involved.

## 11.3 Synchronous vs asynchronous code

Synchronous code waits for an operation to finish before continuing. Asynchronous code can suspend while waiting for I/O so other coroutines can progress.

\`\`\`python
import asyncio

async def fetch_data():
    await asyncio.sleep(1)
    return {"status": "ok"}

async def main():
    result = await fetch_data()
    print(result)

asyncio.run(main())
\`\`\`

Key terms:
- \`async def\`: defines a coroutine function.
- Calling it creates a coroutine object.
- \`await\`: suspends the current coroutine until the awaited operation completes.
- An event loop schedules and runs coroutines.

Async does not automatically make CPU-heavy code faster. Blocking calls inside an async endpoint can block the event loop.

## 11.4 Context managers

A context manager controls setup and cleanup around a block of code. The \`with\` statement is commonly used for files, locks, and database resources.

## 11.5 Type hints

\`\`\`python
def calculate_total(prices: list[float]) -> float:
    return sum(prices)
\`\`\`

Type hints improve readability, editor support, and static analysis. Python does not enforce ordinary type hints at runtime by itself.

---

# 12. Modules, environments, and packaging

## 12.1 Module vs package

- **Module:** a Python file that can be imported.
- **Package:** a way to organize related modules under a package namespace. Regular packages commonly contain \`__init__.py\`; namespace packages are also supported.

\`\`\`python
import json
from pathlib import Path
\`\`\`

## 12.2 Main guard

\`\`\`python
def main():
    print("Application started")

if __name__ == "__main__":
    main()
\`\`\`

The condition is true when the file is executed as the main program, not when it is imported as a normal module.

## 12.3 Virtual environments

A virtual environment isolates project dependencies so projects can use different package versions.

\`\`\`bash
# Create
python -m venv .venv

# Activate on Windows PowerShell
.venv\\Scripts\\Activate.ps1

# Activate on Linux/macOS
source .venv/bin/activate

# Install dependencies
python -m pip install fastapi uvicorn

# Export / restore requirements
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
\`\`\`

Use the interpreter and package manager belonging to the active environment. Tools such as \`uv\` can also manage project dependencies and lockfiles.

## 12.4 PEP 8

PEP 8 is Python's style guide. It recommends conventions for naming, formatting, imports, and readability. Consistent style makes code easier to review and maintain.

---

# 13. SQL and database access

Backend and AI interviews may test SQL even when the role is mainly Python.

## 13.1 CRUD

CRUD means Create, Read, Update, Delete.

\`\`\`sql
INSERT INTO users (name, age)
VALUES ('Sara', 24);

SELECT * FROM users;

UPDATE users
SET age = 25
WHERE name = 'Sara';

DELETE FROM users
WHERE name = 'Sara';
\`\`\`

Always check the \`WHERE\` clause before running an UPDATE or DELETE.

## 13.2 Filtering and sorting

\`\`\`sql
SELECT name, age
FROM users
WHERE age >= 18
ORDER BY age DESC;
\`\`\`

Know: \`AND\`, \`OR\`, \`IN\`, \`BETWEEN\`, \`LIKE\`, \`IS NULL\`, \`LIMIT\`.

## 13.3 Aggregation

\`\`\`sql
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
\`\`\`

- \`WHERE\` filters rows before grouping.
- \`HAVING\` filters groups after aggregation.
- Common aggregate functions: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`.

## 13.4 JOINs

\`\`\`sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders
    ON users.id = orders.user_id;
\`\`\`

- INNER JOIN: only matching rows.
- LEFT JOIN: all left rows plus matching right rows.
- RIGHT JOIN: all right rows plus matching left rows.
- FULL OUTER JOIN: all rows from both sides, matched where possible (support varies by database).

## 13.5 Keys, indexes, and transactions

- Primary key: uniquely identifies a row.
- Foreign key: enforces a relationship to a referenced key.
- Index: can speed up reads but consumes storage and adds write overhead.
- Transaction: a unit of work with properties commonly described by ACID: Atomicity, Consistency, Isolation, Durability.

## 13.6 SQL injection and parameterized queries

Never build SQL by concatenating untrusted user input. Use parameterized queries.

\`\`\`python
# Placeholder syntax depends on the database driver.
cursor.execute(
    "SELECT * FROM users WHERE name = ?",
    (name,)
)
\`\`\`

---

# 14. FastAPI and backend development

## 14.1 What is FastAPI?

FastAPI is a Python framework for building APIs. It uses Python type hints, Pydantic-based validation, dependency injection, and OpenAPI schema generation.

Common strengths:
- Request parsing and validation.
- Automatic interactive API documentation.
- Dependency injection.
- Support for synchronous and asynchronous endpoints.

## 14.2 Minimal API

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World"}

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}
\`\`\`

Run locally:

\`\`\`bash
uvicorn main:app --reload
\`\`\`

## 14.3 HTTP methods

| Method | Typical purpose |
|---|---|
| GET | Retrieve a resource |
| POST | Create a resource or trigger processing |
| PUT | Replace a resource |
| PATCH | Partially update a resource |
| DELETE | Delete a resource |

## 14.4 HTTP status codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthenticated / authentication required |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Unprocessable Content; FastAPI commonly uses it for validation errors |
| 500 | Internal Server Error |

## 14.5 Pydantic models

Pydantic validates and parses data using type annotations.

\`\`\`python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    age: int
    email: EmailStr
\`\`\`

Use schemas to define and validate request and response shapes.

## 14.6 Dependency injection

Dependency injection provides a dependency to a component rather than forcing that component to construct it internally. In FastAPI, \`Depends\` is a common mechanism.

\`\`\`python
from fastapi import Depends, FastAPI

app = FastAPI()

def get_current_user():
    return {"username": "demo"}

@app.get("/profile")
def profile(user=Depends(get_current_user)):
    return user
\`\`\`

Benefits: reuse, separation of concerns, and easier testing.

## 14.7 CORS

Cross-Origin Resource Sharing is a browser mechanism controlling whether a frontend from one origin can access a backend from another origin.

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
\`\`\`

In production, allow only trusted origins.

## 14.8 Authentication vs authorization

- Authentication: verifies who the user is.
- Authorization: determines what the user is allowed to do.

A signed JWT provides integrity/authenticity of its claims, but a normal signed JWT is not encrypted. Do not store secrets in its payload.

## 14.9 Clean backend architecture

A maintainable backend may separate:
- Routers: HTTP endpoints.
- Schemas: request and response validation.
- Services: business logic.
- Repositories: database access.
- Models: database entities.
- Configuration: environment-specific settings.

The exact structure should fit the size and complexity of the application; avoid unnecessary layers in a tiny project.

---

# 15. Testing and debugging

## 15.1 Types of tests

- Unit test: tests a small unit in isolation.
- Integration test: checks that components work together.
- End-to-end test: checks a complete user workflow.
- Regression test: ensures a previously fixed defect does not return.

## 15.2 pytest basics

\`\`\`python
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
\`\`\`

Run tests:

\`\`\`bash
pytest
pytest -v
pytest --cov=your_package
\`\`\`

## 15.3 Fixtures

Fixtures provide reusable setup or test resources.

\`\`\`python
import pytest

@pytest.fixture
def sample_numbers():
    return [1, 2, 3]

def test_sum(sample_numbers):
    assert sum(sample_numbers) == 6
\`\`\`

## 15.4 Mocking

Mocking replaces a dependency with a controlled test double. It is useful for external APIs, email services, databases, and expensive model calls. Test your own behavior without relying on a real external service.

## 15.5 Coverage

Coverage measures which code was executed by tests. High coverage does not prove correctness: assertions may be weak, and important edge cases may be missing.

## 15.6 Debugging approach

1. Reproduce the problem.
2. Read the full traceback.
3. Identify the failing line and inputs.
4. Inspect types and values.
5. Reduce the problem to a minimal example.
6. Fix the root cause.
7. Add a regression test.
8. Run the relevant test suite.

---

# 16. Python for data science and machine learning

## 16.1 NumPy

NumPy provides efficient numerical arrays and vectorized operations.

\`\`\`python
import numpy as np

values = np.array([1, 2, 3])
print(values.mean())
print(values.sum())
print(values.shape)
\`\`\`

Compared with ordinary Python lists, NumPy arrays support efficient numerical operations and multidimensional data.

## 16.2 Pandas

Pandas is used for data manipulation and analysis.

\`\`\`python
import pandas as pd

df = pd.read_csv("data.csv")

df.head()
df.info()
df.describe()
df.isnull().sum()
df.drop_duplicates()
df["price"].mean()
df.groupby("category")["price"].mean()
\`\`\`

- Series: one-dimensional labeled data.
- DataFrame: two-dimensional tabular data.

## 16.3 Typical Scikit-learn workflow

1. Define features (X) and target (y).
2. Split into training and test sets.
3. Fit preprocessing on training data.
4. Train the model.
5. Evaluate on held-out data.
6. Tune using validation or cross-validation.
7. Keep the test set for final evaluation.

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(accuracy_score(y_test, predictions))
\`\`\`

## 16.4 Classification vs regression

- Classification predicts a category or class.
- Regression predicts a continuous numerical value.

Examples:
- Classification: defective vs non-defective component.
- Regression: predicting trip duration or export quantity.

## 16.5 Overfitting vs underfitting

- Overfitting: strong training performance but weak performance on unseen data.
- Underfitting: model is too simple to capture the pattern and performs poorly on both training and test data.

Ways to address overfitting: regularization, simpler models, more representative data, cross-validation, feature selection, and appropriate augmentation.

## 16.6 Metrics

Classification:
- Accuracy = correct predictions / all predictions.
- Precision = TP / (TP + FP).
- Recall = TP / (TP + FN).
- F1 = harmonic mean of precision and recall.
- ROC-AUC: ranking/discrimination measure across thresholds.

Regression:
- MAE: mean absolute error.
- MSE: mean squared error.
- RMSE: square root of MSE.
- R²: proportion of target variance explained relative to a mean baseline.

Choose metrics based on the cost of errors. For defect detection, missing a real defect (false negative) may be more costly than flagging a good item (false positive), so recall may be especially important.

## 16.7 Data leakage

Data leakage happens when training or evaluation uses information that would not legitimately be available at prediction time.

Example: fitting a scaler on the full dataset before splitting. Correct approach: split first, fit preprocessing only on training data, then transform validation/test data using the fitted transformer. Scikit-learn Pipelines help prevent leakage.

---

# 17. Python for LLMs and Generative AI

## 17.1 What is an LLM?

A Large Language Model is a neural network trained on large datasets to process and generate language. It generates text by predicting tokens conditioned on the input context.

## 17.2 Embeddings

An embedding maps content (such as text) to a numerical vector. Embeddings can represent semantic relationships and are used for semantic search, clustering, recommendations, and retrieval.

## 17.3 Vector databases

Vector databases store embeddings and support similarity search. Examples include ChromaDB, Pinecone, Weaviate, Milvus, and PostgreSQL with pgvector.

## 17.4 RAG: Retrieval-Augmented Generation

RAG combines retrieval from an external knowledge source with LLM generation.

Typical pipeline:
1. Load documents.
2. Clean and split documents into chunks.
3. Generate embeddings for chunks.
4. Store vectors and metadata.
5. Embed the user query.
6. Retrieve relevant chunks.
7. Build a prompt containing the question and retrieved context.
8. Ask the LLM to generate an answer.
9. Return sources/citations when available.

Important design choices: chunk size and overlap, embedding model, retrieval strategy, top-k, metadata filters, reranking, context limits, and evaluation.

## 17.5 RAG vs fine-tuning

| RAG | Fine-tuning |
|---|---|
| Retrieves external information at query time | Updates model weights |
| Useful for changing/private knowledge | Useful for adapting behavior or task patterns |
| Can expose retrieved source references | Does not automatically provide current external facts |
| Requires a retrieval pipeline | Requires suitable training data and training compute |

They solve different problems and can sometimes be combined.

## 17.6 Hallucinations and grounding

A hallucination is an answer that sounds plausible but is unsupported or false. Mitigations include trusted retrieval, explicit grounding instructions, citations, structured-output validation, evaluation, and allowing the system to say it does not know. None guarantees zero hallucinations.

## 17.7 Prompt engineering and temperature

Prompt engineering means designing instructions, context, examples, and output constraints to guide model behavior.

Temperature influences randomness in token selection:
- Lower: generally more predictable.
- Higher: generally more varied.

Temperature does not guarantee factual correctness.

## 17.8 Evaluating RAG/LLM applications

Evaluate more than whether the answer sounds good:
- Retrieval relevance and recall.
- Faithfulness to retrieved context.
- Answer relevance and correctness.
- Citation correctness.
- Latency and cost.
- Robustness to missing or conflicting information.
- Safety and privacy behavior.

---

# 18. Common coding exercises

Practise writing each function yourself before looking at the solution. Consider empty inputs, duplicates, negative values, and invalid input where relevant.

## 18.1 Reverse a string

\`\`\`python
def reverse_string(text: str) -> str:
    return text[::-1]
\`\`\`

## 18.2 Palindrome check

\`\`\`python
def is_palindrome(text: str) -> bool:
    normalized = text.lower().replace(" ", "")
    return normalized == normalized[::-1]
\`\`\`

For production use, decide explicitly how punctuation, accents, and Unicode normalization should be handled.

## 18.3 Count element frequencies

\`\`\`python
def count_frequency(values):
    counts = {}
    for value in values:
        counts[value] = counts.get(value, 0) + 1
    return counts
\`\`\`

Requires hashable values.

## 18.4 Find duplicates

\`\`\`python
def find_duplicates(values):
    seen = set()
    duplicates = set()

    for value in values:
        if value in seen:
            duplicates.add(value)
        else:
            seen.add(value)

    return duplicates
\`\`\`

Average time: O(n). Requires hashable values.

## 18.5 Second-largest distinct number

\`\`\`python
def second_largest(values):
    unique = sorted(set(values))
    if len(unique) < 2:
        return None
    return unique[-2]
\`\`\`

This version is O(n log n) due to sorting. Be prepared to discuss an O(n) one-pass solution.

## 18.6 Prime number check

\`\`\`python
def is_prime(number):
    if number < 2:
        return False

    for divisor in range(2, int(number ** 0.5) + 1):
        if number % divisor == 0:
            return False

    return True
\`\`\`

Only test divisors up to the square root.

## 18.7 FizzBuzz

\`\`\`python
def fizzbuzz(limit):
    for number in range(1, limit + 1):
        if number % 15 == 0:
            print("FizzBuzz")
        elif number % 3 == 0:
            print("Fizz")
        elif number % 5 == 0:
            print("Buzz")
        else:
            print(number)
\`\`\`

Check divisibility by 15 (or both conditions) before checking 3 and 5 individually.

## 18.8 Missing number from 1..n

Assumption: input contains distinct integers from 1 through n, with exactly one missing.

\`\`\`python
def missing_number(values, n):
    expected_sum = n * (n + 1) // 2
    return expected_sum - sum(values)
\`\`\`

## 18.9 Remove duplicates while preserving order

\`\`\`python
def unique_in_order(values):
    return list(dict.fromkeys(values))
\`\`\`

Requires hashable values.

## 18.10 Merge dictionaries

\`\`\`python
first = {"name": "Sara"}
second = {"age": 24}

merged = {**first, **second}
# Python 3.9+: merged = first | second
\`\`\`

When keys overlap, the later dictionary's value wins.

---

# 19. Frequently asked interview questions

Use these as short oral-answer prompts. Practise explaining each answer in your own words.

1. **Is Python dynamically typed?** Yes. Types are determined at runtime; names can be rebound to objects of different types.
2. **Is Python strongly typed?** Yes. It generally rejects operations between incompatible types instead of silently coercing them.
3. **What is PEP 8?** The Python style guide for readable, consistent code.
4. **What is None?** A singleton representing the absence of a value.
5. **List vs tuple?** Both are ordered; lists are mutable and tuples are immutable.
6. **List vs set?** Lists preserve sequence and allow duplicates; sets enforce uniqueness and support fast average-case membership.
7. **append vs extend?** append adds one object; extend adds elements from an iterable.
8. **remove vs pop?** remove deletes the first matching value; pop removes and returns an item by index (last by default).
9. **sort vs sorted?** sort mutates a list; sorted returns a new sorted list.
10. **== vs is?** Equality vs object identity.
11. **What is a module?** An importable unit of Python code, commonly a .py file.
12. **What is a package?** A namespace for organizing related modules.
13. **What is the main guard?** It runs code only when the module is executed as the main program.
14. **What is recursion?** A function calling itself; it needs a base case.
15. **What is a docstring?** A string documenting a module, class, or function.
16. **What is a virtual environment?** An isolated environment for project dependencies.
17. **What is duck typing?** Suitability is based on supported behavior rather than explicit inheritance/type.
18. **What is a generator?** An iterator-producing function that yields values lazily.
19. **What is a decorator?** A callable that wraps another callable to extend or modify behavior.
20. **What is a context manager?** An object that manages setup and cleanup around a with block.
21. **What is a hashable object?** An object with a stable hash and equality behavior, usable as a dict key or set member.
22. **What is dependency injection?** Supplying a component's dependencies from outside rather than constructing them inside.
23. **What is an API?** An interface through which software components communicate.
24. **What is REST?** An architectural style for networked APIs centered on resources and a uniform interface.
25. **What is the difference between authentication and authorization?** Verifying identity vs checking permissions.
26. **What is a unit test?** A test of a small unit of behavior, usually in isolation.
27. **What is data leakage?** Using information during training/evaluation that would not be available legitimately at prediction time.
28. **What is RAG?** Retrieving external context and providing it to an LLM to ground generation.
29. **What is an embedding?** A vector representation of content.
30. **What is overfitting?** Learning training-specific patterns that do not generalize well to unseen data.

---

# 20. Final revision checklist

## Python fundamentals
- [ ] Explain dynamic typing and strong typing.
- [ ] Distinguish mutable and immutable objects.
- [ ] Explain equality (\`==\`) vs identity (\`is\`).
- [ ] Use strings, slicing, and common operators confidently.

## Data structures and problem-solving
- [ ] Compare list, tuple, set, and dictionary.
- [ ] Add, update, remove, and iterate through dictionary entries.
- [ ] Count frequencies using a dictionary.
- [ ] Find duplicates using a set.
- [ ] Explain time complexity of common operations.
- [ ] Solve string and list exercises without assistance.

## Functions and OOP
- [ ] Explain parameters, arguments, return, and print.
- [ ] Use \`*args\`, \`**kwargs\`, and comprehensions.
- [ ] Explain scope and mutable default argument pitfalls.
- [ ] Explain the four OOP pillars.
- [ ] Distinguish instance, class, and static methods.
- [ ] Explain composition vs inheritance.

## Runtime and quality
- [ ] Handle exceptions and files safely.
- [ ] Explain iterables, iterators, and generators.
- [ ] Explain decorators and context managers.
- [ ] Explain references and shallow vs deep copies.
- [ ] Write and run pytest tests.
- [ ] Debug from a traceback.

## Backend and AI
- [ ] Write basic SQL queries, joins, and aggregations.
- [ ] Explain HTTP methods and status codes.
- [ ] Explain FastAPI, Pydantic, dependency injection, and CORS.
- [ ] Explain sync vs async and when to use each.
- [ ] Explain ML training, evaluation, overfitting, and leakage.
- [ ] Explain embeddings, vector databases, RAG, and hallucinations.
- [ ] Defend the architecture and technical decisions in your own projects.

---

## Recommended study order

1. Python fundamentals and data structures.
2. Functions, loops, and coding exercises.
3. OOP, exceptions, and file handling.
4. Complexity, memory, iterators, and generators.
5. SQL and FastAPI.
6. Testing, debugging, and concurrency.
7. NumPy, Pandas, ML, embeddings, and RAG.
8. Timed mock assessments and project-defense practice.

**Interview rule:** For every concept, practise four steps: define it clearly, give a small code example, explain when you would use it, and mention a common pitfall. Understanding and being able to implement the concept matters more than memorizing a definition.
