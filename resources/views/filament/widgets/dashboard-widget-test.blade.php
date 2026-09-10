<div class="widget page-dashboard-header-widgets bg-white rounded-lg shadow-md grid grid-cols-2">
  <div class="p-4">
    <h2 class="text-xl font-bold text-blue-900">Latest Posts</h2>
    @foreach($posts as $post)
      <div class="pb-4">
        <h3 class="text-lg font-bold text-blue-900">{{ $post['title'] }}</h3>
        <p>{{ $post['excerpt'] }}</p>
        <span class="text-sm text-blue-900">{{ $post['locale'] }}</span>
        <div class="text-sm text-blue-900">
          Categories: {{ implode(', ', $post['categories']) }}
        </div>
      </div>
    @endforeach
  </div>
</div>