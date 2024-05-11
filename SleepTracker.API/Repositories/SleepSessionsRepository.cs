using SleepTracker.API.Data;
using SleepTracker.API.Models;

namespace SleepTracker.API.Repositories;

public class SleepSessionsRepository(SleepSessionsContext context) : ISleepSessionsRepository
{
  private readonly SleepSessionsContext _context = context;

  public Task AddSession(SleepSession session)
  {
    throw new NotImplementedException();
  }

  public Task DeleteSession(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<SleepSession>> GetAllSessions()
  {
    throw new NotImplementedException();
  }

  public Task<SleepSession?> GetSessionById(int id)
  {
    throw new NotImplementedException();
  }

  public Task UpdateSession(SleepSession session)
  {
    throw new NotImplementedException();
  }
}
