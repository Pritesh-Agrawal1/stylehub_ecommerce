package com.app.stylehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.stylehub.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
