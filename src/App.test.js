import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

afterEach(() => {
  window.history.pushState({}, '', '/');
  window.localStorage.clear();
});

test('muestra la portada y los accesos principales', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /tu festival, bajo control/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /ver agenda/i })).toBeInTheDocument();
});

test('filtra películas desde el catálogo completo', () => {
  window.history.pushState({}, '', '/movies');
  render(<App />);

  const search = screen.getByRole('searchbox', { name: /buscar películas/i });
  fireEvent.change(search, { target: { value: 'minotaur' } });

  expect(screen.getByLabelText('1 película')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Minotaur' })).toBeInTheDocument();
});

test('actualiza las tarjetas al cambiar entre resultados filtrados', () => {
  window.history.pushState({}, '', '/movies');
  render(<App />);

  const search = screen.getByRole('searchbox', { name: /buscar películas/i });
  fireEvent.change(search, { target: { value: 'premio' } });
  expect(screen.getByLabelText('3 películas')).toBeInTheDocument();

  fireEvent.change(search, { target: { value: 'público' } });

  expect(screen.getByLabelText('1 película')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Premio del público' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Premio de la juventud' })).not.toBeInTheDocument();
});
