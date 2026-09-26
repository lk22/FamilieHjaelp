<?php /** @var int $usersCount */

  use Livewire\Component;

  new class extends Component {
    public function gotoUsersPage()
    {
      return redirect()->route('users.index');
    }
  }
?>

<a
  wire:click="gotoUsersPage"
>
  <div class="bg-white shadow rounded-lg transition hover:shadow-lg">
    <div class="p-8">
      <h2 class="text-2xl font-bold text-blue-900 mb-4">Ialt antal brugere</h2>
      <p class="text-md text-blue-900 mb-2">Der er {{ $usersCount }} brugere registreret</p>
      <p class="text-3xl text-blue-900 font-bold">{{ $usersCount }}</p>
    </div>
  </div>
</a>