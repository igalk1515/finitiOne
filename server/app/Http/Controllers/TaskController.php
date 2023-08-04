<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request) {
        // Logic to create a task
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'completed' => 'boolean',
        ]);

        $task = Task::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'due_date' => $request->input('due_date'),
            'completed' => $request->input('completed', false), // default value is false
        ]);

        return response()->json(['message' => 'Task created successfully!', 'task' => $task], 201);
    }

    public function index() {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function search(Request $request) {
        $queryParameters = $request->input('query');

        $title = $queryParameters['title'] ?? null;
        $description = $queryParameters['description'] ?? null;
        $due_date = $queryParameters['due_date'] ?? null;

        $query = Task::query();

        if ($title) {
            $query->where('title', 'like', "%{$title}%");
        }

        if ($description) {
            $query->where('description', 'like', "%{$description}%");
        }

        if ($due_date) {
            $query->where('due_date', $due_date);
        }

        $tasks = $query->get();

        return response()->json($tasks);
    }

    public function destroy($id) {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully!'], 200);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'due_date' => 'sometimes|required|date',
            'completed' => 'sometimes|required|boolean',
        ]);

        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->update([
            'title' => $request->input('title', $task->title),
            'description' => $request->input('description', $task->description),
            'due_date' => $request->input('due_date', $task->due_date),
            'completed' => $request->input('completed', $task->completed),
        ]);

        return response()->json(['message' => 'Task updated successfully!', 'task' => $task], 200);
    }

}
