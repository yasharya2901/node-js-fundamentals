class A:
    instance = None
    def __new__(cls, *args):
        if (cls.instance is None):
            cls.instance = super().__new__(cls)
        return super().__new__(cls)

    def __init__(self, x, y):
        print("Initializing instance", x, y)
        self.x = x
        self.y = y

    def __str__(self):
        return f"A({self.x}, {self.y})"

a = A(10, 20)

print(a)