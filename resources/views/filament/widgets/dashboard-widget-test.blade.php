<div class="bg-blue-900 flex flex-wrap w-full font-bold">
  @foreach($posts as $post)
    <div class="p-4 border-b">
      <h3 class="text-lg font-bold text-blue-800">{{ $post['title'] }}</h3>
      <p>{{ $post['excerpt'] }}</p>
      <span class="text-sm text-gray-500">{{ $post['locale'] }}</span>
      <div class="text-sm text-gray-500">
        Categories: {{ implode(', ', $post['categories']) }}
      </div>
    </div>
  @endforeach
</div>