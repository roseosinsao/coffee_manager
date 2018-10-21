namespace CoffeeManager.Models
{
    using Microsoft.EntityFrameworkCore;

    public partial class coffeemanagersqldbContext : DbContext
    {
        public coffeemanagersqldbContext()
        {
        }

        public coffeemanagersqldbContext(DbContextOptions<coffeemanagersqldbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Coffee> Coffee { get; set; }
        public virtual DbSet<CoffeeIngredient> CoffeeIngredient { get; set; }
        public virtual DbSet<Ingredient> Ingredient { get; set; }
        public virtual DbSet<Office> Office { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Pantry> Pantry { get; set; }
        public virtual DbSet<Stock> Stock { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=AGAPHETOS-WIN10\\SQLEXPRESS;Initial Catalog=coffeemanagersqldb;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coffee>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CoffeeIngredient>(entity =>
            {
                entity.HasKey(e => new { e.CoffeeId, e.IngredientId });
            });

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Office>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.HasOne(d => d.Pantry)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.PantryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Order_Pantry");
            });

            modelBuilder.Entity<Pantry>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.Pantry)
                    .HasForeignKey(d => d.OfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Pantry_Office");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.HasKey(e => new { e.PantryId, e.IngredientId });
            });
        }
    }
}
