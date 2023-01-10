import math
import sqlite3

from sympy import Segment, Circle, Line

conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE sample(a PRIMARY KEY, b, c)").fetchall()
conn.execute("INSERT INTO sample VALUES (1,2,3), (4, 5, 6)")
conn.execute("SELECT * FROM sample").fetchall()
conn.execute("INSERT OR REPLACE INTO sample VALUES (5, 7, 8)")

import sympy

t = sympy.symbols("t")
ax, ay, aVx, aVy, aAngle, aAngleVel = sympy.symbols("ax ay aVx aVy aAngle aAngleVel")
Px, Py, Qx, Qy = sympy.symbols("Px Py Qx Qy")
ox, oy, oVx, oVy, oRad, oAngleVel = sympy.symbols("ox oy oVx oVy oRad oAngleVel")

aAngleT = aAngle + aAngleVel * t
PxT = ax + Px * sympy.cos(aAngleT) - Py * sympy.sin(aAngleT) + aVx * t
PyT = ay + Px * sympy.sin(aAngleT) + Py * sympy.cos(aAngleT) + aVy * t

QxT = ax + Qx * sympy.cos(aAngleT) - Qy * sympy.sin(aAngleT) + aVx * t
QyT = ay + Qx * sympy.sin(aAngleT) + Qy * sympy.cos(aAngleT) + aVy * t

OxT = ox + oVx * t
OyT = ox + oVy * t

PQlen = sympy.sqrt((PxT - QxT) ** 2 + (PyT - QyT) ** 2)
PQ_ = Segment((PxT, PyT), (QxT, QyT))
PQ = Line(PQ_).simplify()
O = Circle((OxT, OyT), oRad).simplify()

cross = sympy.intersection(PQ, O)
