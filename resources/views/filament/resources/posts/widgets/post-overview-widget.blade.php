<x-filament-widgets::widget>
    <x-filament::section>
        {{-- Widget content --}}
        <p>{{ $this->getPost()?->title }}</p>
        <p>{{ $this->getPost()?->content }}</p>
    </x-filament::section>
</x-filament-widgets::widget>
