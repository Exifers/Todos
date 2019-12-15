import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {delete_, get, options, post} from "fetch-factorized";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton, Input, TextField, Select, MenuItem, Switch, InputLabel, FormControl, FormControlLabel, Fab
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Todo = ({onDelete, onDeleted, onError, todo}) => {
  const [deleting, setDeleting] = useState<boolean>(false)

  const handleDelete = (id: number): void => {
    delete_(`/api/todos/${id}`)
      .then(() => {
        onDeleted(todo)
      })
      .catch((e) => {
        console.log('ERROR HAPPENED')
        console.log(e)
        onError(todo)
        setDeleting(false)
      })
    setDeleting(true)
    onDelete(todo)
  }

  return (
    <>
      <ListItem key={todo.id}>
        <ListItemText>
          {todo.text}
        </ListItemText>
        <ListItemSecondaryAction onClick={() => handleDelete(todo.id)} aria-disabled={deleting}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  )
}

Todo.defaultProps = {
  onDelete: () => {
  },
  onDeleted: () => {
  },
  onError: () => {
  }
}

const Todos: React.FC = () => {

  const [todos, setTodos] = useState<any[]>([])
  const [value, setValue] = useState<string>('')
  const [posting, setPosting] = useState<boolean>(false)

  useEffect(() => {
    get('/api/todos')
      .then(setTodos)
      .catch(console.warn)
  }, [])

  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value)
  }

  const handleKeyDown = (event: { key: string }): void => {
    if (event.key === 'Enter' && !posting && value) {
      post('/api/todos/', {text: value})
        .then((todo) => {
          setValue('')
          setTodos([...todos, todo])
        })
        .catch(() => {
        })
        .finally(() => {
          setPosting(false)
        })
      setPosting(true)
    }
  }

  const handleDeleted = (deleted) => {
    setTodos(todos.filter(todo => todo.id !== deleted.id))
  }

  return (
    <div style={{margin: "auto", width: 400, padding: 50}}>
      <Card>
        <CardHeader title={'Todos'} subheader={'List of todos'}/>
        <CardContent>
          <List>
            {todos.map(todo => (
              <Todo key={todo.id} todo={todo} onDeleted={handleDeleted}/>
            ))}
          </List>
          <Input type={'text'} onChange={handleChange} onKeyDown={handleKeyDown} value={value}/>
        </CardContent>
      </Card>
    </div>
  );
}

const ARFItem: React.FC<{ url: string }> = ({url}) => {
  return (
    <ListItem>
      <ListItemText>one item</ListItemText>
    </ListItem>
  )
}

const ARFList: React.FC<{ url: string, fields: any }> = ({url, fields}) => {
  const [items, setItems] = useState<any>(null)

  useEffect(() => {
    get(url)
      .then(setItems)
      .catch(console.warn)
  }, [])

  return (
    <List>
      {items && items.map(item => (
        <ARFItem key={item.id} url={url + item.id}/>
      ))}
    </List>
  )
}

const ARFInteger: React.FC<{ field: any }> = ({field}) => {
  return (
    <FormControl>
      <TextField type={'number'} label={field.label}/>
    </FormControl>
  )
}

const ARFString: React.FC<{ field: any }> = ({field}) => {
  return (
    <FormControl>
      <TextField id={field.label} label={field.label}/>
    </FormControl>
  )
}

const ARFDatetime: React.FC<{ field: any }> = ({field}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker value={selectedDate} onChange={date => setSelectedDate(date)} label={field.label}/>
        <KeyboardTimePicker value={selectedDate} onChange={time => setSelectedDate(time)}/>
      </MuiPickersUtilsProvider>
    </FormControl>
  )
}

const ARFChoice: React.FC<{ field: any }> = ({field}) => {
  const [value, setValue] = useState<string>(null)
  const inputLabel = useRef<any>()

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [])

  return (
    <FormControl>
      <InputLabel htmlFor={field.label} ref={inputLabel}>{field.label}</InputLabel>
      <Select id={field.label} value={value} onChange={(event: any) => setValue(event.target.value)}
              labelWidth={labelWidth} style={{width: 100}}>
        {field.choices.map(choice => (
          <MenuItem value={choice['value']}>
            {choice['display_name']}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const ARFBoolean: React.FC<{ field: any }> = ({field}) => {
  return (
    <FormControl>
      <FormControlLabel label={field.label} control={
        <Switch id={field.label}/>
      }>
      </FormControlLabel>
    </FormControl>
  )
}

const ARFField: React.FC<{ field: any }> = ({field}) => {
  switch (field.type) {
    case 'integer':
      return <ARFInteger field={field}/>
    case 'string':
      return <ARFString field={field}/>
    case 'datetime':
      return <ARFDatetime field={field}/>
    case 'choice':
      return <ARFChoice field={field}/>
    case 'boolean':
      return <ARFBoolean field={field}/>
    default:
      return null
  }
}

const ARFCreate: React.FC<{ url: string, fields: any }> = ({url, fields}) => {
  const [data, setData] = useState<any>({})
  return (
    <>
      <List>
        {Object.keys(fields)
          .filter(field => !fields[field]['read_only'])
          .map(field => (
            <ListItem>
              <ARFField field={fields[field]}/>
            </ListItem>
          ))}
      </List>
      <Fab color="primary" aria-label="add">
        <AddIcon/>
      </Fab>
    </>
  )
}

const ARFActions: React.FC<{ url: string, actions: any }> = ({url, actions}) => {
  return (
    <>
      <ARFList url={url} fields={actions.POST}/>
      <ARFCreate url={url} fields={actions.POST}/>
    </>
  )
}

const ARF: React.FC<{ url: string }> = ({url}) => {
  const [schema, setSchema] = useState<any>(null)

  useEffect(() => {
    options(url)
      .then(setSchema)
      .catch(console.warn)
  }, [])

  return (
    <div style={{margin: "auto", width: 400, padding: 50}}>
      {schema && (
        <Card>
          <CardHeader title={schema.name} subheader={schema.description}/>
          <CardContent>
            <ARFActions actions={schema.actions} url={url}/>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const App: React.FC = () => {
  return (
    <>
      <Todos/>
      <ARF url={'/api/todos/'}/>
    </>
  )
}

export default App;
