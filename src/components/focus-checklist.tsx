"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export function FocusChecklist() {
  // State management with React hooks
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: "1", text: "Clear workspace of distractions", completed: true },
    { id: "2", text: "Set specific goals for this session", completed: false },
    { id: "3", text: "Prepare water/tea to stay hydrated", completed: false },
    { id: "4", text: "Turn on Do Not Disturb mode", completed: true },
    { id: "5", text: "Take a 2-minute mindfulness break", completed: false },
  ])
  const [newItemText, setNewItemText] = useState("")

  // Event handlers using modern patterns
  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const addItem = () => {
    if (newItemText.trim()) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          text: newItemText,
          completed: false,
        },
      ])
      setNewItemText("")
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem()
    }
  }

  // Calculate completed items count
  const completedCount = items.filter((item) => item.completed).length

  return (
    <div>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium">Neuroscience-Based Focus Checklist</h3>
        <div className="text-xs sm:text-sm text-purple-400">
          {completedCount}/{items.length} completed
        </div>
      </div>

      <div className="flex gap-2 mb-3 sm:mb-4">
        <Input
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new checklist item"
          className="flex-1 bg-gray-900/70 border border-purple-500/30 focus:ring-purple-500 text-sm"
        />
        <Button
          onClick={addItem}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-purple-500/10"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Checkbox
                id={`item-${item.id}`}
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={`item-${item.id}`}
                className={`text-xs sm:text-sm ${item.completed ? "line-through text-gray-400" : "text-white"}`}
              >
                {item.text}
              </label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-gray-400 hover:text-white"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
        <h4 className="text-xs sm:text-sm font-medium text-purple-300 mb-1 sm:mb-2">Neuroscience Tip</h4>
        <p className="text-xs sm:text-sm text-gray-300">
          Research shows that checking off completed tasks releases dopamine in the brain, creating a sense of
          accomplishment that motivates continued focus and productivity.
        </p>
      </div>
    </div>
  )
}
