import { StudentRepository } from 'repositories';
import type { ListStudentsQuery } from 'validations';

export const listStudents = async (uid: string, query: ListStudentsQuery) => {
  const { q, status, page, limit, sort, order } = query;
  let items = await StudentRepository.findAllByOwner(uid);

  if (status !== 'all') items = items.filter((s) => s.status === status);
  if (q) {
    const kw = q.toLowerCase();
    items = items.filter((s) => s.name.toLowerCase().includes(kw) || (s.subjectName ?? '').toLowerCase().includes(kw));
  }
  items.sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1;
    return sort === 'name' ? a.name.localeCompare(b.name, 'ko') * dir : (a.registrationNo - b.registrationNo) * dir;
  });

  const total = items.length;
  const start = (page - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    total,
    page,
    limit,
    hasNext: start + limit < total,
  };
};
