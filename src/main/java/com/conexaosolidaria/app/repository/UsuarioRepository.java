package com.conexaosolidaria.app.repository;

import com.conexaosolidaria.app.domain.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Usuario entity.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>, JpaSpecificationExecutor<Usuario> {
    default Optional<Usuario> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Usuario> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Usuario> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select usuario from Usuario usuario left join fetch usuario.user",
        countQuery = "select count(usuario) from Usuario usuario"
    )
    Page<Usuario> findAllWithToOneRelationships(Pageable pageable);

    @Query("select usuario from Usuario usuario left join fetch usuario.user")
    List<Usuario> findAllWithToOneRelationships();

    @Query("select usuario from Usuario usuario left join fetch usuario.user where usuario.id =:id")
    Optional<Usuario> findOneWithToOneRelationships(@Param("id") Long id);
}
