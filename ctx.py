class Command: ...

class Cmd_ParseGameBatch(Command): ...

class Cmd_ParseGameEvent(Command): ...

class Cmd_ExecuteHandlers(Command): ...

class Handle_MyEvent(Command): ...

class IO_MyData:
    def read(self, ctx, path, set_value):
        ...

    def write(self, ctx, path, value):
        ...

class Context:
    ...

class Datatype_Player:
    pass
    # a_variable: str = var(

class Datatype_GameItem:
    ...

class MetaStorage:
    ...

class MetaDataType:
    ...

class MetaDataVar:
    ...

class MetaDataVarType:
    ...

class Primitive(MetaDataVarType):
    def __init__(self, python):
        pass

class OperationMeta:
    ...

class ExpressionMeta:
    ...

class EventActivator: ...

class EventHandler: ...

class EventListener: ...