import random
from typing import NamedTuple

unstructured = NamedTuple("unstructured", val=dict)
string = NamedTuple("string", val=str)


class number(NamedTuple("number", val=float)): ...


class SlotClass:
    __slots__ = ["val"]
    def __init__(self, v):
        self.val = v
class Class:
    def __init__(self, v):
        self.val = v
class PropClass:
    def __init__(self, v):
        self._v = v
    @property
    def val(self):
        return self._v

def make_test(mk_num, mk_str, mk_dict):
    def dict_get(u: unstructured, k: string):
        return mk_num(u.val.get(k.val))

    def num_add(a: number, b: number):
        return mk_num(a.val + b.val)
    def _():
        r = mk_num(0)
        for i in range(1000):
            k1, k2 = mk_str("a"), mk_str("b")
            d = mk_dict({"a": random.randint(0, 3000), "b": random.randint(0, 3000)})
            r = num_add(r, num_add(dict_get(d, k1), dict_get(d, k2)))
        return r

    return _


def make_baseline():
    def _():
        r = 0
        for i in range(1000):
            k1, k2 = "a", "b"
            d = {"a": random.randint(0, 3000), "b": random.randint(0, 3000)}
            r = r + d.get(k1) + d.get(k2)
        return r
    return _


nt = make_test(
    lambda s: number(s),
    lambda s: string(s),
    lambda d: unstructured(d)
)
rc = make_test(
    lambda v: Class(v),
    lambda v: Class(v),
    lambda v: Class(v)
)
sc = make_test(
    lambda v: SlotClass(v),
    lambda v: SlotClass(v),
    lambda v: SlotClass(v)
)
pc = make_test(
    lambda v: PropClass(v),
    lambda v: PropClass(v),
    lambda v: PropClass(v)
)
base = make_baseline()

%timeit nt()
%timeit rc()
%timeit sc()
%timeit pc()
%timeit base()
