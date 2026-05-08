import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  memo: string;
  imageUrl: string;
  expanded: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
        memo: '',
        imageUrl: '',
        expanded: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleExpand = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
    ));
  };

  const updateMemo = (id: number, memo: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, memo } : todo
    ));
  };

  const updateImage = (id: number, imageUrl: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, imageUrl } : todo
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          프리미엄 투두 리스트
        </h1>
        
        <div className="mb-8 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="새로운 할 일을 입력하세요..."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTodo}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleExpand(todo.id)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    {todo.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {todo.expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          메모
                        </label>
                        <textarea
                          value={todo.memo}
                          onChange={(e) => updateMemo(todo.id, e.target.value)}
                          placeholder="상세 메모를 입력하세요..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          이미지 URL
                        </label>
                        <input
                          type="url"
                          value={todo.imageUrl}
                          onChange={(e) => updateImage(todo.id, e.target.value)}
                          placeholder="이미지 URL을 입력하세요..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {todo.imageUrl && (
                          <img
                            src={todo.imageUrl}
                            alt="Todo image"
                            className="mt-2 max-w-full h-auto rounded-lg shadow-sm"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;