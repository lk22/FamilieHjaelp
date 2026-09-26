<div class="bg-white p-8 shadow rounded-lg transition hover:shadow-lg">
  <h2 class="text-2xl font-bold text-blue-900 mb-4">
    Seneste registreret brugere: {{ $latestRegisteredUsersCount }}
  </h2>
  <div class="user-items">
    <div class="list-headers mb-4 pb-4 flex justify-between border-b-2 border-gray-200">
      <span class="header-name text-lg font-bold">Navn</span>
      <span class="header-email text-lg font-bold">E-mail</span>
      <span class="header-date text-lg font-bold">Oprettet d.</span>
    </div>
    @foreach($latestRegisteredUsers as $user)
      <div class="user-item flex justify-between border-b-2 border-gray-200 pb-4">
        <span class="user-name">
          {{ $user->name }}
        </span>
        <span class="user-email">
          {{ $user->email }}
        </span>
        <span class="user-date">
          {{ $user->created_at->format('d-m-Y') }}
        </span>
      </div>
    @endforeach
  </div>
</div>